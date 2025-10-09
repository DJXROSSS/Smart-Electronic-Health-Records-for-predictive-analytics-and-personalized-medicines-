import 'package:deviathon_runtime_terror/Screens/HomePage.dart';
import 'package:deviathon_runtime_terror/Screens/StarterPage.dart';
import 'package:flutter/material.dart';

class SignUpPage extends StatefulWidget {
  const SignUpPage({super.key});

  @override
  State<SignUpPage> createState() => _SignUpPageState();
}

// todo -- add a confirm password field

final TextEditingController nameController = TextEditingController();
final TextEditingController emailController = TextEditingController();
final TextEditingController passwordController = TextEditingController();
bool isPasswordVisible = false;

class _SignUpPageState extends State<SignUpPage> {
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(15.0),
      child: Column(
        spacing: 10,
        children: [
          TextField(
            controller: nameController,
            decoration: InputDecoration(
              labelText: "Name",
              // icon: Icon(Icons.email_outlined),
              prefixIcon: Icon(Icons.person_2_outlined),
              border: OutlineInputBorder(borderRadius: BorderRadius.circular(20)),
            ),
          ),
          TextField(
            controller: emailController,
            decoration: InputDecoration(
              labelText: "Email",
              // icon: Icon(Icons.email_outlined),
              prefixIcon: Icon(Icons.email_outlined),
              border: OutlineInputBorder(borderRadius: BorderRadius.circular(20)),
            ),
          ),
          TextField(
            controller: passwordController,
            obscureText: !isPasswordVisible,
            decoration: InputDecoration(
              labelText: "Password",
              suffixIcon: Padding(
                padding: const EdgeInsets.only(right: 4),
                child: IconButton(
                  icon: Icon(
                    isPasswordVisible ? Icons.visibility : Icons.visibility_off,
                  ),
                  onPressed: () => setState(() => isPasswordVisible = !isPasswordVisible),
                ),
              ),
              // icon: Icon(Icons.email_outlined),
              prefixIcon: Icon(Icons.password),
              border: OutlineInputBorder(borderRadius: BorderRadius.circular(20)),
            ),
          ),
          SizedBox(height: 20),
          ElevatedButton(
            style: ButtonStyle(
                backgroundColor: WidgetStateColor.resolveWith((states) => accent)
            ),
            onPressed: () {
              ScaffoldMessenger.of(context).showSnackBar(
                SnackBar(content: Text("Signed up as ${nameController.text}")),
              );
              Navigator.push(
                context,
                MaterialPageRoute(builder: (context) => HomePage()),
              );
            },
            child: Text("Sign Up", style: TextStyle(color: Colors.black),),
          ),
        ],
      ),
    );
  }
}

