// import 'package:deviathon_runtime_terror/Screens/HomePage.dart';
// import 'package:flutter/material.dart';
// import 'package:deviathon_runtime_terror/components/profile_page.dart';
// import 'package:deviathon_runtime_terror/components/CustomTextField.dart';

// class EditProfilePage extends StatefulWidget {
//   const EditProfilePage({super.key});

//   @override
//   State<EditProfilePage> createState() => _EditProfilePageState();
// }

// class _EditProfilePageState extends State<EditProfilePage> {
//   final nameController = TextEditingController();
//   final ageController = TextEditingController();
//   final genderController = TextEditingController();
//   final contactController = TextEditingController();
//   final allergiesController = TextEditingController();
//   final medicationController = TextEditingController();
//   final dobcontroller = TextEditingController();
//   final conditioncontroller = TextEditingController();

//   @override
//   Widget build(BuildContext context) {
//     return Scaffold(
//       appBar: AppBar(title: const Text("Edit Profile"),
//           backgroundColor: Color(0xFF81D4FA),
//       ),
//       body: Padding(
//         padding: const EdgeInsets.all(16),
//         child: SingleChildScrollView(
//           child: Column(
//             children: [
//               CustomTextField(label: "Full Name", icon: Icons.person, controller: nameController,),
//               CustomTextField(label: "Age", icon: Icons.cake, controller: ageController, keyboardType: TextInputType.number),
//               CustomTextField(label: "Gender", icon: Icons.wc, controller: genderController),
//               CustomTextField(label: "Contact Number", icon: Icons.phone, controller: contactController, keyboardType: TextInputType.phone),
//               CustomTextField(label: "Allergies", icon: Icons.healing, controller: allergiesController),
//               CustomTextField(label: "Medications", icon: Icons.medical_information, controller: medicationController),
//               CustomTextField(label: "Date of Birth", icon: Icons.calendar_today_rounded, controller: dobcontroller, isDate: true),
//               CustomTextField(label: "Chronic Conditions", icon: Icons.library_add_sharp, controller: conditioncontroller),

//               const SizedBox(height: 20),
//               ElevatedButton(
//                 onPressed: () {
//                   Navigator.pushReplacement(
//                     context,
//                     MaterialPageRoute(
//                       builder: (_) => HomePage(
//                         profileData: ProfilePage(
//                           name: nameController.text,
//                           age: ageController.text,
//                           gender: genderController.text,
//                           contact: contactController.text,
//                           allergies: allergiesController.text,
//                           medication: medicationController.text,
//                           dob: dobcontroller.text,
//                           condition: conditioncontroller.text,
//                         ),
//                       ),
//                     ),
//                   );
//                 },
//                 style: ElevatedButton.styleFrom(
//                   backgroundColor: Color(0xFF81D4FA),
//                 ),
//                 child: const Text(
//                   "Save & View Profile",
//                   style: TextStyle(color: Colors.white),
//                 ),
//               )

//               // ElevatedButton(
//               //   onPressed: () {
//               //     // Navigate to Profile Page and pass data
//               //     Navigator.push(
//               //       context,
//               //       MaterialPageRoute(
//               //         builder: (_) => ProfilePage(
//               //           name: nameController.text,
//               //           age: ageController.text,
//               //           gender: genderController.text,
//               //           contact: contactController.text,
//               //           allergies: allergiesController.text,
//               //           medication: medicationController.text,
//               //           dob: dobcontroller.text,
//               //           condition: conditioncontroller.text,
//               //         ),
//               //       ),
//               //     );
//               //   },
//               //   style: ElevatedButton.styleFrom(backgroundColor: Color(0xFF81D4FA),),
//               //   child: const Text("Save & View Profile", style: TextStyle(color: Colors.white), ),
//               // ),
//             ],
//           ),
//         ),
//       ),
//     );
//   }
// }

import 'package:deviathon_runtime_terror/Screens/HomePage.dart';
import 'package:flutter/material.dart';
import 'package:deviathon_runtime_terror/components/profile_page.dart';
import 'package:deviathon_runtime_terror/components/CustomTextField.dart';

class EditProfilePage extends StatefulWidget {
  const EditProfilePage({super.key});

  @override
  State<EditProfilePage> createState() => _EditProfilePageState();
}

class _EditProfilePageState extends State<EditProfilePage> with SingleTickerProviderStateMixin {
  final nameController = TextEditingController();
  final ageController = TextEditingController();
  final genderController = TextEditingController();
  final contactController = TextEditingController();
  final allergiesController = TextEditingController();
  final medicationController = TextEditingController();
  final dobController = TextEditingController();
  final conditionController = TextEditingController();

  late AnimationController _animationController;
  late Animation<double> _fadeAnimation;
  late Animation<Offset> _slideAnimation;

  @override
  void initState() {
    super.initState();
    _animationController = AnimationController(
      duration: const Duration(milliseconds: 600),
      vsync: this,
    );
    
    _fadeAnimation = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(parent: _animationController, curve: Curves.easeOut),
    );
    
    _slideAnimation = Tween<Offset>(
      begin: const Offset(0, 0.05),
      end: Offset.zero,
    ).animate(CurvedAnimation(parent: _animationController, curve: Curves.easeOut));
    
    _animationController.forward();
  }

  @override
  void dispose() {
    nameController.dispose();
    ageController.dispose();
    genderController.dispose();
    contactController.dispose();
    allergiesController.dispose();
    medicationController.dispose();
    dobController.dispose();
    conditionController.dispose();
    _animationController.dispose();
    super.dispose();
  }

  void _saveProfile() {
    // Validate at least name is provided
    if (nameController.text.trim().isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: const Row(
            children: [
              Icon(Icons.error_outline, color: Colors.white),
              SizedBox(width: 12),
              Text('Please enter your name'),
            ],
          ),
          backgroundColor: Colors.red[400],
          behavior: SnackBarBehavior.floating,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
        ),
      );
      return;
    }

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
            dob: dobController.text,
            condition: conditionController.text,
          ),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF8F9FA),
      appBar: AppBar(
        elevation: 0,
        backgroundColor: Colors.transparent,
        leading: IconButton(
          onPressed: () => Navigator.pop(context),
          icon: Container(
            padding: const EdgeInsets.all(8),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(12),
              boxShadow: [
                BoxShadow(
                  color: Colors.black.withOpacity(0.05),
                  blurRadius: 8,
                  offset: const Offset(0, 2),
                ),
              ],
            ),
            child: const Icon(Icons.arrow_back_ios_new_rounded, size: 18, color: Colors.black87),
          ),
        ),
        title: const Text(
          "Edit Profile",
          style: TextStyle(
            color: Colors.black87,
            fontWeight: FontWeight.bold,
            fontSize: 20,
          ),
        ),
        centerTitle: true,
      ),
      body: FadeTransition(
        opacity: _fadeAnimation,
        child: SlideTransition(
          position: _slideAnimation,
          child: SingleChildScrollView(
            physics: const BouncingScrollPhysics(),
            child: Padding(
              padding: const EdgeInsets.all(20.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Profile Avatar Section
                  Center(
                    child: Stack(
                      children: [
                        Container(
                          width: 100,
                          height: 100,
                          decoration: BoxDecoration(
                            shape: BoxShape.circle,
                            gradient: const LinearGradient(
                              begin: Alignment.topLeft,
                              end: Alignment.bottomRight,
                              colors: [Color(0xFF4A90E2), Color(0xFF357ABD)],
                            ),
                            boxShadow: [
                              BoxShadow(
                                color: const Color(0xFF4A90E2).withOpacity(0.3),
                                blurRadius: 20,
                                offset: const Offset(0, 8),
                              ),
                            ],
                          ),
                          child: const Icon(
                            Icons.person_rounded,
                            size: 50,
                            color: Colors.white,
                          ),
                        ),
                        Positioned(
                          bottom: 0,
                          right: 0,
                          child: Container(
                            padding: const EdgeInsets.all(8),
                            decoration: BoxDecoration(
                              color: Colors.white,
                              shape: BoxShape.circle,
                              boxShadow: [
                                BoxShadow(
                                  color: Colors.black.withOpacity(0.1),
                                  blurRadius: 8,
                                  offset: const Offset(0, 2),
                                ),
                              ],
                            ),
                            child: const Icon(
                              Icons.camera_alt_rounded,
                              size: 18,
                              color: Color(0xFF4A90E2),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 32),

                  // Personal Information Section
                  _buildSectionHeader("Personal Information", Icons.person_outline_rounded),
                  const SizedBox(height: 16),
                  CustomTextField(
                    label: "Full Name",
                    icon: Icons.person,
                    controller: nameController,
                  ),
                  const SizedBox(height: 16),
                  Row(
                    children: [
                      Expanded(
                        child: CustomTextField(
                          label: "Age",
                          icon: Icons.cake,
                          controller: ageController,
                          keyboardType: TextInputType.number,
                        ),
                      ),
                      const SizedBox(width: 16),
                      Expanded(
                        child: CustomTextField(
                          label: "Gender",
                          icon: Icons.wc,
                          controller: genderController,
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 16),
                  CustomTextField(
                    label: "Date of Birth",
                    icon: Icons.calendar_today_rounded,
                    controller: dobController,
                    isDate: true,
                  ),
                  const SizedBox(height: 16),
                  CustomTextField(
                    label: "Contact Number",
                    icon: Icons.phone,
                    controller: contactController,
                    keyboardType: TextInputType.phone,
                  ),

                  const SizedBox(height: 32),

                  // Medical Information Section
                  _buildSectionHeader("Medical Information", Icons.medical_services_outlined),
                  const SizedBox(height: 16),
                  CustomTextField(
                    label: "Allergies",
                    icon: Icons.healing,
                    controller: allergiesController,
                  ),
                  const SizedBox(height: 16),
                  CustomTextField(
                    label: "Current Medications",
                    icon: Icons.medication_rounded,
                    controller: medicationController,
                  ),
                  const SizedBox(height: 16),
                  CustomTextField(
                    label: "Chronic Conditions",
                    icon: Icons.favorite_border_rounded,
                    controller: conditionController,
                  ),

                  const SizedBox(height: 40),

                  // Save Button
                  SizedBox(
                    width: double.infinity,
                    height: 56,
                    child: ElevatedButton(
                      onPressed: _saveProfile,
                      style: ElevatedButton.styleFrom(
                        backgroundColor: const Color(0xFF4A90E2),
                        foregroundColor: Colors.white,
                        elevation: 0,
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(16),
                        ),
                        shadowColor: const Color(0xFF4A90E2).withOpacity(0.4),
                      ),
                      child: const Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Icon(Icons.check_circle_outline_rounded, size: 22),
                          SizedBox(width: 12),
                          Text(
                            "Save Profile",
                            style: TextStyle(
                              fontSize: 16,
                              fontWeight: FontWeight.bold,
                              letterSpacing: 0.5,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),

                  const SizedBox(height: 20),

                  // Cancel Button
                  SizedBox(
                    width: double.infinity,
                    height: 56,
                    child: OutlinedButton(
                      onPressed: () => Navigator.pop(context),
                      style: OutlinedButton.styleFrom(
                        foregroundColor: const Color(0xFF4A90E2),
                        side: const BorderSide(color: Color(0xFF4A90E2), width: 2),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(16),
                        ),
                      ),
                      child: const Text(
                        "Cancel",
                        style: TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.w600,
                          letterSpacing: 0.5,
                        ),
                      ),
                    ),
                  ),

                  const SizedBox(height: 40),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildSectionHeader(String title, IconData icon) {
    return Row(
      children: [
        Container(
          padding: const EdgeInsets.all(8),
          decoration: BoxDecoration(
            color: const Color(0xFF4A90E2).withOpacity(0.1),
            borderRadius: BorderRadius.circular(10),
          ),
          child: Icon(
            icon,
            size: 20,
            color: const Color(0xFF4A90E2),
          ),
        ),
        const SizedBox(width: 12),
        Text(
          title,
          style: const TextStyle(
            fontSize: 18,
            fontWeight: FontWeight.bold,
            color: Colors.black87,
            letterSpacing: 0.3,
          ),
        ),
      ],
    );
  }
}