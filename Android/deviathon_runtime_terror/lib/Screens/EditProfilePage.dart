import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';

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
  final dobController = TextEditingController();
  final conditionController = TextEditingController();

  String? _userEmail;
  bool _isLoading = true;
  String? _errorMessage;

  @override
  void initState() {
    super.initState();
    _fetchCurrentProfile();
  }

  // ✅ 1. Fetch existing data to show in the text fields
  Future<void> _fetchCurrentProfile() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    final email = prefs.getString('email');

    if (email == null || email.isEmpty) {
      setState(() {
        _isLoading = false;
        _errorMessage = "Could not find user email. Please log in again.";
      });
      return;
    }

    setState(() { _userEmail = email; });

    final url = Uri.parse('http://10.156.194.228:5000/api/user/profile/$email');

    try {
      final response = await http.get(url);
      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        setState(() {
          nameController.text = data['name'] ?? '';
          ageController.text = data['age']?.toString() ?? '';
          genderController.text = data['gender'] ?? '';
          contactController.text = data['contact'] ?? '';
          allergiesController.text = data['allergies'] ?? '';
          medicationController.text = data['medications'] ?? '';
          dobController.text = data['dob'] ?? '';
          conditionController.text = data['conditions'] ?? '';
          _isLoading = false;
        });
      } else {
        setState(() {
          _errorMessage = "Failed to load profile data.";
          _isLoading = false;
        });
      }
    } catch (e) {
      setState(() {
        _errorMessage = "Network Error. Could not load profile.";
        _isLoading = false;
      });
    }
  }

  // ✅ 2. Fix the API call to match your backend
  Future<void> updateUserProfile() async {
    if (_userEmail == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text("Error: User email not found!")),
      );
      return;
    }

    // FIX: Your backend route is '/api/user/profile/update'
    final url = Uri.parse('http://10.156.194.228:5000/api/user/profile/update');

    try {
      final response = await http.put(
        url,
        headers: {"Content-Type": "application/json"},
        body: jsonEncode({
          // FIX: Your backend expects the email in the body for the update
          "email": _userEmail,
          "name": nameController.text,
          "age": int.tryParse(ageController.text) ?? 0,
          "gender": genderController.text,
          "contact": contactController.text,
          "allergies": allergiesController.text,
          "medications": medicationController.text,
          "dob": dobController.text,
          "conditions": conditionController.text,
        }),
      );

      if (mounted) { // Check if the widget is still in the widget tree
        if (response.statusCode == 200) {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(
                backgroundColor: Colors.green,
                content: Text("Profile updated successfully!")),
          );
          // ✅ 3. Fix navigation
          // Navigate to the ProfilePage, which will re-fetch the new data
          Navigator.pushReplacement(
            context,
            MaterialPageRoute(builder: (_) => const ProfilePage()),
          );
        } else {
          ScaffoldMessenger.of(context).showSnackBar(
              SnackBar(content: Text("Failed to update profile: ${response.body}")));
        }
      }
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text("A network error occurred: $e")));
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Edit Profile"),
        backgroundColor: const Color(0xFF81D4FA),
      ),
      body: _isLoading
          ? const Center(child: CircularProgressIndicator())
          : _errorMessage != null
          ? Center(child: Text(_errorMessage!, style: const TextStyle(color: Colors.red)))
          : Padding(
        padding: const EdgeInsets.all(16),
        child: SingleChildScrollView(
          child: Column(
            children: [
              CustomTextField(label: "Full Name", icon: Icons.person, controller: nameController),
              CustomTextField(label: "Age", icon: Icons.cake, controller: ageController, keyboardType: TextInputType.number),
              CustomTextField(label: "Gender", icon: Icons.wc, controller: genderController),
              CustomTextField(label: "Contact Number", icon: Icons.phone, controller: contactController, keyboardType: TextInputType.phone),
              CustomTextField(label: "Allergies", icon: Icons.healing, controller: allergiesController),
              CustomTextField(label: "Medications", icon: Icons.medical_information, controller: medicationController),
              CustomTextField(label: "Date of Birth", icon: Icons.calendar_today_rounded, controller: dobController, isDate: true),
              CustomTextField(label: "Chronic Conditions", icon: Icons.library_add_sharp, controller: conditionController),
              const SizedBox(height: 20),
              ElevatedButton(
                onPressed: updateUserProfile, // Call the corrected update function
                style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFF81D4FA),
                    padding: const EdgeInsets.symmetric(horizontal: 40, vertical: 15)
                ),
                child: const Text(
                  "Save Changes",
                  style: TextStyle(color: Colors.white, fontSize: 16),
                ),
              )
            ],
          ),
        ),
      ),
    );
  }
}