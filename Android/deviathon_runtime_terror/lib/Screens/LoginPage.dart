import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';
import 'Signup.dart'; // Make sure you have this file in your project
import 'HomePage.dart'; // Make sure you have this file in your project

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final TextEditingController emailController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();
  bool isPasswordVisible = false;
  final Color accent = Color(0xFF81D4FA);
  String? _errorMessage;
  bool _isLoading = false; // To show a loading indicator

  Future<void> loginUser() async {
    // Clear previous errors and set loading state
    setState(() {
      _errorMessage = null;
      _isLoading = true;
    });

    if (emailController.text.isEmpty || passwordController.text.isEmpty) {
      setState(() {
        _errorMessage = "Please enter both email and password.";
        _isLoading = false;
      });
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
      ).timeout(const Duration(seconds: 10)); // Added a timeout for better UX

      // --- CRUCIAL DEBUGGING PRINTS ---
      // These lines will show you exactly what the server is sending back.
      debugPrint('Status Code: ${response.statusCode}');
      debugPrint('Response Body: ${response.body}');
      // --- END OF DEBUGGING PRINTS ---

      if (response.statusCode == 200) {
        // Successful login
        final data = jsonDecode(response.body);
        final prefs = await SharedPreferences.getInstance();
        await prefs.setString("token", data["token"]);
        await prefs.setString("name", data["user"]["name"]);

        // Navigate to HomePage on success
        if (mounted) { // Check if the widget is still in the tree
          Navigator.pushReplacement(
            context,
            MaterialPageRoute(builder: (_) => const HomePage()),
          );
        }
      } else {
        // Handle server errors (like 400, 401, 500)
        String errorMessage = "An unknown error occurred.";
        try {
          // Try to parse a JSON error message from the server
          final data = jsonDecode(response.body);
          errorMessage = data["error"] ?? "Login failed. Please check your credentials.";
        } catch (e) {
          // If the response is not JSON (like the HTML error page you received)
          errorMessage = "Server returned an unexpected response. Please try again later.";
          debugPrint("Failed to decode JSON from error response: $e");
        }
        setState(() => _errorMessage = errorMessage);
      }
    } catch (e) {
      // Handle network errors (no connection, timeout, etc.)
      debugPrint("Network or other error: $e");
      setState(() => _errorMessage = "Network error. Please check your connection and try again.");
    } finally {
      // Ensure the loading indicator is turned off
      if(mounted) {
        setState(() => _isLoading = false);
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SingleChildScrollView(
        child: Center(
          child: Container(
            width: MediaQuery.of(context).size.width,
            padding: const EdgeInsets.all(20),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                const SizedBox(height: 60), // Added space for status bar
                CircleAvatar(radius: 50, backgroundColor: const Color(0xFFE3F2FD), child: Icon(Icons.person, size: 50, color: accent)),
                const SizedBox(height: 20),
                const Text("Welcome to MedVault!", style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: Colors.black54), textAlign: TextAlign.center),
                const SizedBox(height: 20),
                const Text("All your health records here, just one tap away!", style: TextStyle(fontSize: 16, color: Colors.black54), textAlign: TextAlign.center),
                const SizedBox(height: 40),

                TextField(
                  controller: emailController,
                  decoration: InputDecoration(
                    labelText: "Email",
                    prefixIcon: const Icon(Icons.email_outlined),
                    border: OutlineInputBorder(borderRadius: BorderRadius.circular(20)),
                  ),
                  keyboardType: TextInputType.emailAddress,
                ),
                const SizedBox(height: 20),

                TextField(
                  controller: passwordController,
                  obscureText: !isPasswordVisible,
                  decoration: InputDecoration(
                    labelText: "Password",
                    prefixIcon: const Icon(Icons.lock_outline),
                    suffixIcon: IconButton(
                      icon: Icon(isPasswordVisible ? Icons.visibility : Icons.visibility_off),
                      onPressed: () => setState(() => isPasswordVisible = !isPasswordVisible),
                    ),
                    border: OutlineInputBorder(borderRadius: BorderRadius.circular(20)),
                  ),
                ),

                if (_errorMessage != null) ...[
                  const SizedBox(height: 15),
                  Text(_errorMessage!, style: const TextStyle(color: Colors.red, fontSize: 14), textAlign: TextAlign.center),
                ],

                Align(
                  alignment: Alignment.centerRight,
                  child: TextButton(
                    onPressed: () { /* Forgot password logic here */ },
                    child: Text("Forgot Password?", style: TextStyle(color: Colors.blueAccent[700], fontSize: 14)),
                  ),
                ),
                const SizedBox(height: 20),

                _isLoading
                    ? CircularProgressIndicator(color: accent)
                    : ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: accent,
                    padding: const EdgeInsets.symmetric(vertical: 15, horizontal: 80),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(25)),
                  ),
                  onPressed: loginUser,
                  child: const Text("Login", style: TextStyle(color: Colors.white, fontSize: 16)),
                ),

                const SizedBox(height: 20),
                RichText(
                  text: TextSpan(
                    text: "Don't have an account? ",
                    style: const TextStyle(color: Colors.black, fontSize: 14),
                    children: [
                      TextSpan(
                        text: "Sign Up",
                        style: TextStyle(color: Colors.blueAccent[700], fontWeight: FontWeight.bold),
                        recognizer: TapGestureRecognizer()..onTap = () {
                          if (!_isLoading) { // Prevent navigation while loading
                            Navigator.pushReplacement(context, MaterialPageRoute(builder: (_) => const SignUpPage()));
                          }
                        },
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}