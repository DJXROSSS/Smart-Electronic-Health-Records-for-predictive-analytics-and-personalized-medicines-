// import 'package:deviathon_runtime_terror/Screens/LoginPage.dart';
// import 'package:flutter/gestures.dart';
// import 'package:flutter/material.dart';
// import 'EditProfilePage.dart';
//
// class SignUpPage extends StatefulWidget {
//   const SignUpPage({super.key});
//
//   @override
//   State<SignUpPage> createState() => _SignUpPageState();
// }
//
//
// class _SignUpPageState extends State<SignUpPage> {
//   final TextEditingController nameController = TextEditingController();
//   final TextEditingController emailController = TextEditingController();
//   final TextEditingController passwordController = TextEditingController();
//   final TextEditingController confirmPasswordController = TextEditingController();
//   final TextEditingController contactController = TextEditingController();
//   final TextEditingController ageController = TextEditingController();
//   String? selectedGender;
//   bool isPasswordVisible = false;
//   String? _errorMessage;
//   Color accent = Color(0xFF81D4FA);
//
//   void signupUser() {
//     setState(() {
//       _errorMessage = null;
//     });
//
//     if (nameController.text.isEmpty ||
//         emailController.text.isEmpty ||
//         passwordController.text.isEmpty ||
//         confirmPasswordController.text.isEmpty) {
//       setState(() {
//         _errorMessage = "Please enter all required details!";
//       });
//       return;
//     }
//
//     if (passwordController.text != confirmPasswordController.text) {
//       setState(() {
//         _errorMessage = "Passwords do not match!";
//       });
//       return;
//     }
//
//     // Navigate to EditProfilePage
//     Navigator.pushReplacement(
//       context,
//       MaterialPageRoute(builder: (context) => EditProfilePage()),
//     );
//   }
//
//   @override
//   Widget build(BuildContext context) {
//     return Scaffold(
//       body: SafeArea(
//         child: SingleChildScrollView(
//           padding: EdgeInsets.all(15),
//           child: Column(
//             crossAxisAlignment: CrossAxisAlignment.stretch,
//             children: [
//               SizedBox(height: 30),
//               CircleAvatar(
//                 radius: 50,
//                 backgroundColor: Color(0xFFE3F2FD),
//                 child: Icon(Icons.person, size: 50, color: accent),
//               ),
//               SizedBox(height: 20),
//               Text(
//                 "Welcome! Create your account",
//                 style: TextStyle(
//                   fontSize: 20,
//                   fontWeight: FontWeight.bold,
//                   color: Colors.black54,
//                 ),
//                 textAlign: TextAlign.center,
//               ),
//               SizedBox(height: 30),
//
//               TextField(
//                 controller: nameController,
//                 decoration: InputDecoration(
//                   labelText: "Name",
//                   prefixIcon: Icon(Icons.person_2_outlined),
//                   border: OutlineInputBorder(
//                     borderRadius: BorderRadius.circular(20),
//                   ),
//                 ),
//                 keyboardType: TextInputType.name,
//                 textCapitalization: TextCapitalization.words,
//               ),
//               SizedBox(height: 15),
//
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
//               SizedBox(height: 15),
//
//               TextField(
//                 controller: contactController,
//                 decoration: InputDecoration(
//                   labelText: "Contact",
//                   prefixIcon: Icon(Icons.phone),
//                   border: OutlineInputBorder(
//                     borderRadius: BorderRadius.circular(20),
//                   ),
//                 ),
//                 keyboardType: TextInputType.phone,
//               ),
//               SizedBox(height: 15),
//
//               TextField(
//                 controller: ageController,
//                 decoration: InputDecoration(
//                   labelText: "Age",
//                   prefixIcon: Icon(Icons.calendar_today),
//                   border: OutlineInputBorder(
//                     borderRadius: BorderRadius.circular(20),
//                   ),
//                 ),
//                 keyboardType: TextInputType.number,
//               ),
//               SizedBox(height: 15),
//
//               DropdownButtonFormField<String>(
//                 value: selectedGender,
//                 decoration: InputDecoration(
//                   labelText: "Gender",
//                   prefixIcon: Icon(Icons.wc),
//                   border: OutlineInputBorder(
//                     borderRadius: BorderRadius.circular(20),
//                   ),
//                 ),
//                 items: [
//                   DropdownMenuItem(child: Text("Male"), value: "Male"),
//                   DropdownMenuItem(child: Text("Female"), value: "Female"),
//                   DropdownMenuItem(child: Text("Other"), value: "Other"),
//                 ],
//                 onChanged: (value) {
//                   setState(() => selectedGender = value);
//                 },
//               ),
//               SizedBox(height: 15),
//
//               TextField(
//                 controller: passwordController,
//                 obscureText: !isPasswordVisible,
//                 decoration: InputDecoration(
//                   labelText: "Password",
//                   prefixIcon: Icon(Icons.password),
//                   suffixIcon: IconButton(
//                     icon: Icon(
//                       isPasswordVisible ? Icons.visibility : Icons.visibility_off,
//                     ),
//                     onPressed: () => setState(() => isPasswordVisible = !isPasswordVisible),
//                   ),
//                   border: OutlineInputBorder(
//                     borderRadius: BorderRadius.circular(20),
//                   ),
//                 ),
//               ),
//               SizedBox(height: 15),
//
//               TextField(
//                 controller: confirmPasswordController,
//                 obscureText: true,
//                 decoration: InputDecoration(
//                   labelText: "Confirm Password",
//                   prefixIcon: Icon(Icons.password),
//                   border: OutlineInputBorder(
//                     borderRadius: BorderRadius.circular(20),
//                   ),
//                 ),
//               ),
//
//               if (_errorMessage != null) ...[
//                 SizedBox(height: 10),
//                 Text(
//                   _errorMessage!,
//                   style: TextStyle(color: Colors.red),
//                   textAlign: TextAlign.center,
//                 ),
//               ],
//
//               SizedBox(height: 25),
//
//               ElevatedButton(
//                 style: ElevatedButton.styleFrom(
//                   backgroundColor: accent,
//                   padding: EdgeInsets.symmetric(vertical: 15),
//                   shape: RoundedRectangleBorder(
//                     borderRadius: BorderRadius.circular(25),
//                   ),
//                 ),
//                 onPressed: signupUser,
//                 child: Text(
//                   "Sign Up",
//                   style: TextStyle(color: Colors.white, fontSize: 16),
//                 ),
//               ),
//
//               SizedBox(height: 15),
//               RichText(
//                 textAlign: TextAlign.center,
//                 text: TextSpan(
//                   text: "Already have an account? ",
//                   style: TextStyle(color: Colors.black, fontSize: 14),
//                   children: [
//                     TextSpan(
//                       text: "Login",
//                       style: TextStyle(
//                         color: Colors.blueAccent[700],
//                         fontWeight: FontWeight.bold,
//                       ),
//                       recognizer: TapGestureRecognizer()
//                         ..onTap = () {
//                           Navigator.pushReplacement(
//                             context,
//                             MaterialPageRoute(builder: (context) => LoginPage()),
//                           );
//                         },
//                     ),
//                   ],
//                 ),
//               )
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
import 'EditProfilePage.dart';
import 'LoginPage.dart';

class SignUpPage extends StatefulWidget {
  const SignUpPage({super.key});

  @override
  State<SignUpPage> createState() => _SignUpPageState();
}

class _SignUpPageState extends State<SignUpPage> {
  final TextEditingController nameController = TextEditingController();
  final TextEditingController emailController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();
  final TextEditingController confirmPasswordController = TextEditingController();
  final TextEditingController contactController = TextEditingController();
  final TextEditingController ageController = TextEditingController();
  String? selectedGender;
  bool isPasswordVisible = false;
  String? _errorMessage;
  Color accent = Color(0xFF81D4FA);

  Future<void> signupUser() async {
    setState(() => _errorMessage = null);

    if (nameController.text.isEmpty ||
        emailController.text.isEmpty ||
        passwordController.text.isEmpty ||
        confirmPasswordController.text.isEmpty) {
      setState(() => _errorMessage = "Please enter all required details!");
      return;
    }

    if (passwordController.text != confirmPasswordController.text) {
      setState(() => _errorMessage = "Passwords do not match!");
      return;
    }

    try {
      final response = await http.post(
        Uri.parse('http://10.156.194.228:5000/api/user/signup'),
        headers: {"Content-Type": "application/json"},
        body: jsonEncode({
          "name": nameController.text,
          "email": emailController.text,
          "password": passwordController.text,
          "contact": contactController.text,
          "age": ageController.text,
          "gender": selectedGender,
        }),
      );

      final data = jsonDecode(response.body);
      if (response.statusCode == 201) {
        ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(data["message"])));
        Navigator.pushReplacement(
          context,
          MaterialPageRoute(builder: (_) => const EditProfilePage()),
        );
      } else {
        setState(() => _errorMessage = data["error"] ?? "Signup failed!");
      }
    } catch (e) {
      setState(() => _errorMessage = "Network error!");
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: SingleChildScrollView(
          padding: EdgeInsets.all(15),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              SizedBox(height: 30),
              CircleAvatar(
                radius: 50,
                backgroundColor: Color(0xFFE3F2FD),
                child: Icon(Icons.person, size: 50, color: accent),
              ),
              SizedBox(height: 20),
              Text(
                "Welcome! Create your account",
                style: TextStyle(
                  fontSize: 20,
                  fontWeight: FontWeight.bold,
                  color: Colors.black54,
                ),
                textAlign: TextAlign.center,
              ),
              SizedBox(height: 30),

              TextField(
                controller: nameController,
                decoration: InputDecoration(
                  labelText: "Name",
                  prefixIcon: Icon(Icons.person_2_outlined),
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(20)),
                ),
                keyboardType: TextInputType.name,
                textCapitalization: TextCapitalization.words,
              ),
              SizedBox(height: 15),

              TextField(
                controller: emailController,
                decoration: InputDecoration(
                  labelText: "Email",
                  prefixIcon: Icon(Icons.email_outlined),
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(20)),
                ),
                keyboardType: TextInputType.emailAddress,
              ),
              SizedBox(height: 15),

              TextField(
                controller: contactController,
                decoration: InputDecoration(
                  labelText: "Contact",
                  prefixIcon: Icon(Icons.phone),
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(20)),
                ),
                keyboardType: TextInputType.phone,
              ),
              SizedBox(height: 15),

              TextField(
                controller: ageController,
                decoration: InputDecoration(
                  labelText: "Age",
                  prefixIcon: Icon(Icons.calendar_today),
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(20)),
                ),
                keyboardType: TextInputType.number,
              ),
              SizedBox(height: 15),

              DropdownButtonFormField<String>(
                value: selectedGender,
                decoration: InputDecoration(
                  labelText: "Gender",
                  prefixIcon: Icon(Icons.wc),
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(20)),
                ),
                items: [
                  DropdownMenuItem(child: Text("Male"), value: "Male"),
                  DropdownMenuItem(child: Text("Female"), value: "Female"),
                  DropdownMenuItem(child: Text("Other"), value: "Other"),
                ],
                onChanged: (value) => setState(() => selectedGender = value),
              ),
              SizedBox(height: 15),

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
              SizedBox(height: 15),

              TextField(
                controller: confirmPasswordController,
                obscureText: true,
                decoration: InputDecoration(
                  labelText: "Confirm Password",
                  prefixIcon: Icon(Icons.password),
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(20)),
                ),
              ),

              if (_errorMessage != null) ...[
                SizedBox(height: 10),
                Text(_errorMessage!, style: TextStyle(color: Colors.red), textAlign: TextAlign.center),
              ],

              SizedBox(height: 25),
              ElevatedButton(
                style: ElevatedButton.styleFrom(
                  backgroundColor: accent,
                  padding: EdgeInsets.symmetric(vertical: 15),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(25)),
                ),
                onPressed: signupUser,
                child: Text("Sign Up", style: TextStyle(color: Colors.white, fontSize: 16)),
              ),

              SizedBox(height: 15),
              RichText(
                textAlign: TextAlign.center,
                text: TextSpan(
                  text: "Already have an account? ",
                  style: TextStyle(color: Colors.black, fontSize: 14),
                  children: [
                    TextSpan(
                      text: "Login",
                      style: TextStyle(color: Colors.blueAccent[700], fontWeight: FontWeight.bold),
                      recognizer: TapGestureRecognizer()
                        ..onTap = () => Navigator.pushReplacement(
                          context,
                          MaterialPageRoute(builder: (_) => const LoginPage()),
                        ),
                    ),
                  ],
                ),
              )
            ],
          ),
        ),
      ),
    );
  }
}
