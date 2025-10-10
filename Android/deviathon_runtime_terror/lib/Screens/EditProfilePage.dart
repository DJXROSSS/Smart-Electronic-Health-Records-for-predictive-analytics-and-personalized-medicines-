import 'package:deviathon_runtime_terror/Screens/HomePage.dart';
import 'package:flutter/material.dart';
import 'package:deviathon_runtime_terror/components/profile_page.dart';
import 'package:deviathon_runtime_terror/components/CustomTextField.dart';

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
                onPressed: () {
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

