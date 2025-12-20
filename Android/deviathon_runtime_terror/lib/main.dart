import 'package:deviathon_runtime_terror/Screens/EditProfilePage.dart';
import 'package:deviathon_runtime_terror/Screens/HomePage.dart';
import 'package:deviathon_runtime_terror/Screens/LoginPage.dart';
import 'package:deviathon_runtime_terror/Screens/book_appointment_page.dart';
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      debugShowCheckedModeBanner: false,
      home: LoginPage(),
    );
  }
}
