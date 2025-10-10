import 'package:deviathon_runtime_terror/Screens/HomePage.dart';
import 'package:flutter/material.dart';
import 'package:deviathon_runtime_terror/components/profile_page.dart';
import 'package:deviathon_runtime_terror/components/CustomTextField.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

import 'package:shared_preferences/shared_preferences.dart';


class EditProfilePage extends StatefulWidget {
  const EditProfilePage({super.key});

  @override
  State<EditProfilePage> createState() => _EditProfilePageState();
}

class _EditProfilePageState extends State<EditProfilePage> {
  final nameController = TextEditingController();
  final ageController = TextEditingController();
  final genderController = TextEditingController();
  final contactController = TextEditingController();
  final allergiesController = TextEditingController();
  final medicationController = TextEditingController();
  final dobcontroller = TextEditingController();
  final conditioncontroller = TextEditingController();
  String? userEmail;

  @override
  void initState() {
    super.initState();
    _loadUserEmail();
  }

  Future<void> _loadUserEmail() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    setState(() {
      userEmail = prefs.getString('userEmail');
    });
    print("📬 Loaded email: $userEmail");
  }


  // Future<void> updateUserProfile() async {
  //   final email = "user@example.com"; // TODO: Replace with the actual logged-in user's email (from SharedPreferences)
  //   final url = Uri.parse('http://10.156.194.228:5000/api/profile/update/$email');
  //
  //   final response = await http.put(
  //     url,
  //     headers: {"Content-Type": "application/json"},
  //     body: jsonEncode({
  //       "name": nameController.text,
  //       "age": ageController.text,
  //       "gender": genderController.text,
  //       "contact": contactController.text,
  //       "allergies": allergiesController.text,
  //       "medications": medicationController.text,
  //       "dob": dobcontroller.text,
  //       "conditions": conditioncontroller.text,
  //     }),
  //   );
  //
  //   if (response.statusCode == 200) {
  //     ScaffoldMessenger.of(context)
  //         .showSnackBar(SnackBar(content: Text("Profile updated successfully!")));
  //   } else {
  //     ScaffoldMessenger.of(context).showSnackBar(
  //         SnackBar(content: Text("Failed to update profile: ${response.body}")));
  //   }
  // }
  Future<void> updateUserProfile() async {
    if (userEmail == null || userEmail!.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text("User email not found! Please log in again.")),
      );
      return;
    }

    final url = Uri.parse('http://10.156.194.228:5000/api/profile/update/$userEmail');

    final response = await http.put(
      url,
      headers: {"Content-Type": "application/json"},
      body: jsonEncode({
        "name": nameController.text,
        "age": ageController.text,
        "gender": genderController.text,
        "contact": contactController.text,
        "allergies": allergiesController.text,
        "medications": medicationController.text,
        "dob": dobcontroller.text,
        "conditions": conditioncontroller.text,
      }),
    );

    if (response.statusCode == 200) {
      ScaffoldMessenger.of(context)
          .showSnackBar(SnackBar(content: Text("Profile updated successfully!")));
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text("Failed to update profile: ${response.body}")));
    }
  }



  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Edit Profile"),
          backgroundColor: Color(0xFF81D4FA),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: SingleChildScrollView(
          child: Column(
            children: [
              CustomTextField(label: "Full Name", icon: Icons.person, controller: nameController,),
              CustomTextField(label: "Age", icon: Icons.cake, controller: ageController, keyboardType: TextInputType.number),
              CustomTextField(label: "Gender", icon: Icons.wc, controller: genderController),
              CustomTextField(label: "Contact Number", icon: Icons.phone, controller: contactController, keyboardType: TextInputType.phone),
              CustomTextField(label: "Allergies", icon: Icons.healing, controller: allergiesController),
              CustomTextField(label: "Medications", icon: Icons.medical_information, controller: medicationController),
              CustomTextField(label: "Date of Birth", icon: Icons.calendar_today_rounded, controller: dobcontroller, isDate: true),
              CustomTextField(label: "Chronic Conditions", icon: Icons.library_add_sharp, controller: conditioncontroller),

              const SizedBox(height: 20),
              ElevatedButton(
                onPressed: () async {
                  await updateUserProfile();
                  Navigator.pushReplacement(
                    context,
                    MaterialPageRoute(
                      builder: (_) => HomePage(
                        profileData: ProfilePage(
                          name: nameController.text,
                          age: ageController.text,
                          gender: genderController.text,
                          contact: contactController.text,
                          allergies: allergiesController.text,
                          medication: medicationController.text,
                          dob: dobcontroller.text,
                          condition: conditioncontroller.text,
                        ),
                      ),
                    ),
                  );
                },
                // onPressed: () {
                //   Navigator.pushReplacement(
                //     context,
                //     MaterialPageRoute(
                //       builder: (_) => HomePage(
                //         profileData: ProfilePage(
                //           name: nameController.text,
                //           age: ageController.text,
                //           gender: genderController.text,
                //           contact: contactController.text,
                //           allergies: allergiesController.text,
                //           medication: medicationController.text,
                //           dob: dobcontroller.text,
                //           condition: conditioncontroller.text,
                //         ),
                //       ),
                //     ),
                //   );
                // },
                style: ElevatedButton.styleFrom(
                  backgroundColor: Color(0xFF81D4FA),
                ),
                child: const Text(
                  "Save & View Profile",
                  style: TextStyle(color: Colors.white),
                ),
              )

              // ElevatedButton(
              //   onPressed: () {
              //     // Navigate to Profile Page and pass data
              //     Navigator.push(
              //       context,
              //       MaterialPageRoute(
              //         builder: (_) => ProfilePage(
              //           name: nameController.text,
              //           age: ageController.text,
              //           gender: genderController.text,
              //           contact: contactController.text,
              //           allergies: allergiesController.text,
              //           medication: medicationController.text,
              //           dob: dobcontroller.text,
              //           condition: conditioncontroller.text,
              //         ),
              //       ),
              //     );
              //   },
              //   style: ElevatedButton.styleFrom(backgroundColor: Color(0xFF81D4FA),),
              //   child: const Text("Save & View Profile", style: TextStyle(color: Colors.white), ),
              // ),
            ],
          ),
        ),
      ),
    );
  }
}

