// import 'package:deviathon_runtime_terror/Screens/HomePage.dart';
// import 'package:deviathon_runtime_terror/Screens/Signup.dart';
// import 'package:flutter/gestures.dart';
// import 'package:flutter/material.dart';
//
// class LoginPage extends StatefulWidget {
//   const LoginPage({super.key});
//
//   @override
//   State<LoginPage> createState() => _LoginPageState();
// }
//
// class _LoginPageState extends State<LoginPage> {
//   final TextEditingController emailController = TextEditingController();
//   final TextEditingController passwordController = TextEditingController();
//   bool isPasswordVisible = false;
//   Color accent = Color(0xFF81D4FA);
//   String? _errorMessage;
//
//   void loginUser() {
//     setState(() {
//       _errorMessage = null;
//     });
//
//     if (emailController.text.isEmpty || passwordController.text.isEmpty) {
//       setState(() {
//         _errorMessage = "Please enter email and password!";
//       });
//       return;
//     }
//
//     // Directly navigate to HomePage
//     Navigator.pushReplacement(
//       context,
//       MaterialPageRoute(builder: (context) => HomePage()),
//     );
//   }
//
//   @override
//   Widget build(BuildContext context) {
//     return Scaffold(
//       body: Center(
//         child: Container(
//           width: MediaQuery.of(context).size.width,
//           padding: EdgeInsets.all(20),
//           child: Column(
//             mainAxisAlignment: MainAxisAlignment.center,
//             children: [
//               CircleAvatar(
//                 radius: 50,
//                 backgroundColor: Color(0xFFE3F2FD),
//                 child: Icon(Icons.person, size: 50, color: accent),
//               ),
//               SizedBox(height: 20),
//               Text(
//                 "Welcome to MedVault !",
//                 style: TextStyle(
//                     fontSize: 20,
//                     fontWeight: FontWeight.bold,
//                     color: Colors.black54),
//                 textAlign: TextAlign.center,
//               ),
//               SizedBox(height: 20),
//               Text(
//                 "All your health records here, just one tap away!",
//                 style: TextStyle(
//                   fontSize: 16,
//                   fontWeight: FontWeight.w100,
//                   color: Colors.black54,
//                 ),
//                 textAlign: TextAlign.center,
//               ),
//               SizedBox(height: 40),
//               TextField(
//                 controller: emailController,
//                 decoration: InputDecoration(
//                   labelText: "Email",
//                   prefixIcon: Icon(Icons.email_outlined),
//                   border: OutlineInputBorder(
//                     borderRadius: BorderRadius.circular(20),
//                   ),
//                 ),
//                 keyboardType: TextInputType.emailAddress,
//               ),
//               SizedBox(height: 20),
//               TextField(
//                 controller: passwordController,
//                 obscureText: !isPasswordVisible,
//                 decoration: InputDecoration(
//                   labelText: "Password",
//                   prefixIcon: Icon(Icons.password),
//                   suffixIcon: IconButton(
//                     icon: Icon(
//                       isPasswordVisible
//                           ? Icons.visibility
//                           : Icons.visibility_off,
//                     ),
//                     onPressed: () =>
//                         setState(() => isPasswordVisible = !isPasswordVisible),
//                   ),
//                   border: OutlineInputBorder(
//                     borderRadius: BorderRadius.circular(20),
//                   ),
//                 ),
//               ),
//               if (_errorMessage != null) ...[
//                 SizedBox(height: 10),
//                 Text(
//                   _errorMessage!,
//                   style: TextStyle(color: Colors.red),
//                   textAlign: TextAlign.center,
//                 ),
//               ],
//               Align(
//                 alignment: Alignment.centerRight,
//                 child: TextButton(
//                   onPressed: () {
//                     // Optional: forgot password logic
//                   },
//                   child: Text(
//                     "Forgot Password?",
//                     style: TextStyle(
//                       color: Colors.blueAccent[700],
//                       fontSize: 14,
//                     ),
//                   ),
//                 ),
//               ),
//               SizedBox(height: 20),
//               ElevatedButton(
//                 style: ButtonStyle(
//                   backgroundColor:
//                   MaterialStateProperty.resolveWith((states) => accent),
//                   padding: MaterialStateProperty.all(
//                       EdgeInsets.symmetric(vertical: 15, horizontal: 50)),
//                   shape: MaterialStateProperty.all(RoundedRectangleBorder(
//                       borderRadius: BorderRadius.circular(25))),
//                 ),
//                 onPressed: loginUser,
//                 child: Text("Login", style: TextStyle(color: Colors.white)),
//               ),
//               SizedBox(height: 20),
//               RichText(
//                 text: TextSpan(
//                   text: "Don't have an account? ",
//                   style: TextStyle(color: Colors.black, fontSize: 14),
//                   children: [
//                     TextSpan(
//                       text: "Sign Up",
//                       style: TextStyle(
//                         color: Colors.blueAccent[700],
//                         fontWeight: FontWeight.bold,
//                       ),
//                       recognizer: TapGestureRecognizer()
//                         ..onTap = () {
//                           Navigator.pushReplacement(
//                             context,
//                             MaterialPageRoute(
//                                 builder: (context) => const SignUpPage()),
//                           );
//                         },
//                     ),
//                   ],
//                 ),
//               ),
//             ],
//           ),
//         ),
//       ),
//     );
//   }
// }

import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';
import 'Signup.dart';
import 'HomePage.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final TextEditingController emailController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();
  bool isPasswordVisible = false;
  Color accent = Color(0xFF81D4FA);
  String? _errorMessage;

  Future<void> loginUser() async {
    setState(() => _errorMessage = null);

    if (emailController.text.isEmpty || passwordController.text.isEmpty) {
      setState(() => _errorMessage = "Please enter email and password!");
      return;
    }

    try {
      final response = await http.post(
        Uri.parse('http://10.156.194.228:5000/api/user/login'),
        headers: {"Content-Type": "application/json"},
        body: jsonEncode({
          "email": emailController.text,
          "password": passwordController.text
        }),
      );

      final data = jsonDecode(response.body);
      if (response.statusCode == 200) {
        final prefs = await SharedPreferences.getInstance();
        await prefs.setString("token", data["token"]);
        await prefs.setString("name", data["user"]["name"]);

        Navigator.pushReplacement(
          context,
          MaterialPageRoute(builder: (_) => HomePage()),
        );
      } else {
        setState(() => _errorMessage = data["error"] ?? "Login failed!");
      }
    } catch (e) {
      setState(() => _errorMessage = "Network error!");
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Container(
          width: MediaQuery.of(context).size.width,
          padding: EdgeInsets.all(20),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              CircleAvatar(radius: 50, backgroundColor: Color(0xFFE3F2FD), child: Icon(Icons.person, size: 50, color: accent)),
              SizedBox(height: 20),
              Text("Welcome to MedVault !", style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: Colors.black54), textAlign: TextAlign.center),
              SizedBox(height: 20),
              Text("All your health records here, just one tap away!", style: TextStyle(fontSize: 16, fontWeight: FontWeight.w100, color: Colors.black54), textAlign: TextAlign.center),
              SizedBox(height: 40),

              TextField(
                controller: emailController,
                decoration: InputDecoration(
                  labelText: "Email",
                  prefixIcon: Icon(Icons.email_outlined),
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(20)),
                ),
                keyboardType: TextInputType.emailAddress,
              ),
              SizedBox(height: 20),

              TextField(
                controller: passwordController,
                obscureText: !isPasswordVisible,
                decoration: InputDecoration(
                  labelText: "Password",
                  prefixIcon: Icon(Icons.password),
                  suffixIcon: IconButton(
                    icon: Icon(isPasswordVisible ? Icons.visibility : Icons.visibility_off),
                    onPressed: () => setState(() => isPasswordVisible = !isPasswordVisible),
                  ),
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(20)),
                ),
              ),
              if (_errorMessage != null) ...[
                SizedBox(height: 10),
                Text(_errorMessage!, style: TextStyle(color: Colors.red), textAlign: TextAlign.center),
              ],

              Align(
                alignment: Alignment.centerRight,
                child: TextButton(
                  onPressed: () {}, // Forgot password logic here
                  child: Text("Forgot Password?", style: TextStyle(color: Colors.blueAccent[700], fontSize: 14)),
                ),
              ),
              SizedBox(height: 20),

              ElevatedButton(
                style: ElevatedButton.styleFrom(
                  backgroundColor: accent,
                  padding: EdgeInsets.symmetric(vertical: 15, horizontal: 50),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(25)),
                ),
                onPressed: loginUser,
                child: Text("Login", style: TextStyle(color: Colors.white)),
              ),

              SizedBox(height: 20),
              RichText(
                text: TextSpan(
                  text: "Don't have an account? ",
                  style: TextStyle(color: Colors.black, fontSize: 14),
                  children: [
                    TextSpan(
                      text: "Sign Up",
                      style: TextStyle(color: Colors.blueAccent[700], fontWeight: FontWeight.bold),
                      recognizer: TapGestureRecognizer()..onTap = () => Navigator.pushReplacement(context, MaterialPageRoute(builder: (_) => const SignUpPage())),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
