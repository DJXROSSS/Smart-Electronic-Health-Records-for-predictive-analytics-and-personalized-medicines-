// import 'package:flutter/material.dart';
//
// class ProfilePage extends StatefulWidget {
//   const ProfilePage({super.key});
//
//   @override
//   State<ProfilePage> createState() => _ProfilePageState();
// }
//
// class _ProfilePageState extends State<ProfilePage> {
//   // We'll track the enabled state for each field separately
//   final Map<String, bool> enabledMap = {};
//
//   // Controllers for text fields
//   final Map<String, TextEditingController> controllers = {};
//
//   @override
//   void initState() {
//     super.initState();
//
//     // Initialize all fields with data and disabled state
//     controllers.addAll({
//       "Full Name": TextEditingController(text: "Sophia Carter"),
//       "Date of Birth": TextEditingController(text: "October 23, 1990"),
//       "Gender": TextEditingController(text: "Female"),
//       "Address": TextEditingController(text: "123 Wellness Way, Healthtown"),
//       "Phone Number": TextEditingController(text: "(123) 456-7890"),
//       "Allergies": TextEditingController(text: "Pollen, Penicillin"),
//       "Current Medications":
//       TextEditingController(text: "Albuterol Inhaler (as needed)"),
//       "Chronic Conditions": TextEditingController(text: "Asthma"),
//       "Contact Name": TextEditingController(text: "John Carter"),
//       "Relationship": TextEditingController(text: "Spouse"),
//       "Contact Phone": TextEditingController(text: "(123) 456-7891"),
//     });
//
//     // Initially, all fields are disabled
//     for (var key in controllers.keys) {
//       enabledMap[key] = false;
//     }
//   }
//
//   Widget buildTextField(String label, {bool multi = false}) {
//     bool enabled = enabledMap[label] ?? false;
//
//     return Column(
//       crossAxisAlignment: CrossAxisAlignment.start,
//       children: [
//         Text(label, style: const TextStyle(fontWeight: FontWeight.w600)),
//         const SizedBox(height: 6),
//         Row(
//           crossAxisAlignment: CrossAxisAlignment.start,
//           children: [
//             Expanded(
//               child: TextFormField(
//                 controller: controllers[label],
//                 enabled: enabled,
//                 maxLines: multi ? 3 : 1,
//                 textInputAction: TextInputAction.done,
//                 onFieldSubmitted: (_) {
//                   setState(() => enabledMap[label] = false);
//                 },
//                 decoration: InputDecoration(
//                   filled: true,
//                   fillColor: enabled ? Colors.white : Colors.grey[100],
//                   border: OutlineInputBorder(
//                     borderRadius: BorderRadius.circular(12),
//                     borderSide: const BorderSide(color: Colors.grey),
//                   ),
//                 ),
//               ),
//             ),
//             const SizedBox(width: 8),
//             IconButton(
//               onPressed: () {
//                 setState(() => enabledMap[label] = !enabled);
//               },
//               icon: Icon(
//                 enabled ? Icons.done : Icons.edit,
//                 color: Colors.blueAccent,
//               ),
//             ),
//           ],
//         ),
//         const SizedBox(height: 16),
//       ],
//     );
//   }
//
//   @override
//   Widget build(BuildContext context) {
//     return Scaffold(
//       appBar: AppBar(
//         leading: const BackButton(color: Colors.black),
//         backgroundColor: Colors.transparent,
//         elevation: 0,
//         title: const Text(
//           "Profile",
//           style: TextStyle(color: Colors.black, fontWeight: FontWeight.bold),
//         ),
//       ),
//       body: SingleChildScrollView(
//         padding: const EdgeInsets.all(16),
//         child: Column(
//           crossAxisAlignment: CrossAxisAlignment.center,
//           children: [
//             // Profile header
//             Stack(
//               children: [
//                 CircleAvatar(
//                   radius: 60,
//                   backgroundImage: const AssetImage('assets/images/woman.png'),
//                   backgroundColor: Colors.blue[50],
//                 ),
//                 Positioned(
//                   bottom: 0,
//                   right: 0,
//                   child: CircleAvatar(
//                     backgroundColor: Colors.blueAccent,
//                     radius: 18,
//                     child: const Icon(Icons.edit, size: 18, color: Colors.white),
//                   ),
//                 ),
//               ],
//             ),
//             const SizedBox(height: 12),
//             const Text("Sophia Carter",
//                 style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
//             const Text("Patient ID: 123456",
//                 style: TextStyle(color: Colors.grey)),
//             const SizedBox(height: 24),
//
//             // Personal Information
//             const Align(
//               alignment: Alignment.centerLeft,
//               child: Text("Personal Information",
//                   style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
//             ),
//             const SizedBox(height: 10),
//             buildTextField("Full Name"),
//             buildTextField("Date of Birth"),
//             buildTextField("Gender"),
//             buildTextField("Address"),
//             buildTextField("Phone Number"),
//
//             // Medical History
//             const Align(
//               alignment: Alignment.centerLeft,
//               child: Text("Medical History",
//                   style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
//             ),
//             const SizedBox(height: 10),
//             buildTextField("Allergies", multi: true),
//             buildTextField("Current Medications", multi: true),
//             buildTextField("Chronic Conditions", multi: true),
//
//             // Emergency Contacts
//             const Align(
//               alignment: Alignment.centerLeft,
//               child: Text("Emergency Contacts",
//                   style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
//             ),
//             const SizedBox(height: 10),
//             buildTextField("Contact Name"),
//             buildTextField("Relationship"),
//             buildTextField("Contact Phone"),
//
//             // Save button
//             const SizedBox(height: 20),
//             SizedBox(
//               width: double.infinity,
//               height: 50,
//               child: ElevatedButton(
//                 onPressed: () {
//                   ScaffoldMessenger.of(context).showSnackBar(
//                     const SnackBar(content: Text("Profile Saved!")),
//                   );
//                 },
//                 style: ElevatedButton.styleFrom(
//                   backgroundColor: Colors.blueAccent,
//                   shape: RoundedRectangleBorder(
//                       borderRadius: BorderRadius.circular(12)),
//                 ),
//                 child: const Text("Save Changes",
//                     style: TextStyle(color: Colors.white, fontSize: 16)),
//               ),
//             ),
//             const SizedBox(height: 40),
//           ],
//         ),
//       ),
//     );
//   }
// }

// import 'package:flutter/material.dart';
//
// class ProfilePage extends StatefulWidget {
//   const ProfilePage({super.key, required String name, required String age,
//     required String gender, required String contact, required String allergies, required String medication, required String dob});
//
//   @override
//   State<ProfilePage> createState() => _ProfilePageState();
// }
//
// class _ProfilePageState extends State<ProfilePage> {
//   // We'll track the enabled state for each field separately
//   final Map<String, bool> enabledMap = {};
//
//   // Controllers for text fields
//   final Map<String, TextEditingController> controllers = {};
//
//   @override
//   void initState() {
//     super.initState();
//
//     // Initialize all fields with data and disabled state
//     controllers.addAll({
//       "Full Name": TextEditingController(text: "Sophia Carter"),
//       "Date of Birth": TextEditingController(text: "October 23, 1990"),
//       "Gender": TextEditingController(text: "Female"),
//       "Address": TextEditingController(text: "123 Wellness Way, Healthtown"),
//       "Phone Number": TextEditingController(text: "(123) 456-7890"),
//       "Allergies": TextEditingController(text: "Pollen, Penicillin"),
//       "Current Medications":
//       TextEditingController(text: "Albuterol Inhaler (as needed)"),
//       "Chronic Conditions": TextEditingController(text: "Asthma"),
//       "Contact Name": TextEditingController(text: "John Carter"),
//       "Relationship": TextEditingController(text: "Spouse"),
//       "Contact Phone": TextEditingController(text: "(123) 456-7891"),
//     });
//
//     // Initially, all fields are disabled
//     for (var key in controllers.keys) {
//       enabledMap[key] = false;
//     }
//   }
//
//   Widget buildTextField(String label, {bool multi = false}) {
//     bool enabled = enabledMap[label] ?? false;
//
//     return Column(
//       crossAxisAlignment: CrossAxisAlignment.start,
//       children: [
//         Text(label, style: const TextStyle(fontWeight: FontWeight.w600)),
//         const SizedBox(height: 6),
//         Row(
//           crossAxisAlignment: CrossAxisAlignment.start,
//           children: [
//             Expanded(
//               child: TextFormField(
//                 controller: controllers[label],
//                 enabled: enabled,
//                 maxLines: multi ? 3 : 1,
//                 textInputAction: TextInputAction.done,
//                 onFieldSubmitted: (_) {
//                   setState(() => enabledMap[label] = false);
//                 },
//                 decoration: InputDecoration(
//                   filled: true,
//                   fillColor: enabled ? Colors.white : Colors.grey[100],
//                   border: OutlineInputBorder(
//                     borderRadius: BorderRadius.circular(12),
//                     borderSide: const BorderSide(color: Colors.grey),
//                   ),
//                 ),
//               ),
//             ),
//             const SizedBox(width: 8),
//             IconButton(
//               onPressed: () {
//                 setState(() => enabledMap[label] = !enabled);
//               },
//               icon: Icon(
//                 enabled ? Icons.done : Icons.edit,
//                 color: Colors.blueAccent,
//               ),
//             ),
//           ],
//         ),
//         const SizedBox(height: 16),
//       ],
//     );
//   }
//
//   @override
//   Widget build(BuildContext context) {
//     return Scaffold(
//       appBar: AppBar(
//         leading: const BackButton(color: Colors.black),
//         backgroundColor: Colors.transparent,
//         elevation: 0,
//         title: const Text(
//           "Profile",
//           style: TextStyle(color: Colors.black, fontWeight: FontWeight.bold),
//         ),
//       ),
//       body: SingleChildScrollView(
//         padding: const EdgeInsets.all(16),
//         child: Column(
//           crossAxisAlignment: CrossAxisAlignment.center,
//           children: [
//             // Profile header
//             Stack(
//               children: [
//                 CircleAvatar(
//                   radius: 60,
//                   backgroundImage: const AssetImage('assets/images/woman.png'),
//                   backgroundColor: Colors.blue[50],
//                 ),
//                 Positioned(
//                   bottom: 0,
//                   right: 0,
//                   child: CircleAvatar(
//                     backgroundColor: Colors.blueAccent,
//                     radius: 18,
//                     child: const Icon(Icons.edit, size: 18, color: Colors.white),
//                   ),
//                 ),
//               ],
//             ),
//             const SizedBox(height: 12),
//             const Text("Sophia Carter",
//                 style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
//             const Text("Patient ID: 123456",
//                 style: TextStyle(color: Colors.grey)),
//             const SizedBox(height: 24),
//
//             // Personal Information
//             const Align(
//               alignment: Alignment.centerLeft,
//               child: Text("Personal Information",
//                   style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
//             ),
//             const SizedBox(height: 10),
//             buildTextField("Full Name"),
//             buildTextField("Date of Birth"),
//             buildTextField("Gender"),
//             buildTextField("Address"),
//             buildTextField("Phone Number"),
//
//             // Medical History
//             const Align(
//               alignment: Alignment.centerLeft,
//               child: Text("Medical History",
//                   style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
//             ),
//             const SizedBox(height: 10),
//             buildTextField("Allergies", multi: true),
//             buildTextField("Current Medications", multi: true),
//             buildTextField("Chronic Conditions", multi: true),
//
//             // Emergency Contacts
//             const Align(
//               alignment: Alignment.centerLeft,
//               child: Text("Emergency Contacts",
//                   style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
//             ),
//             const SizedBox(height: 10),
//             buildTextField("Contact Name"),
//             buildTextField("Relationship"),
//             buildTextField("Contact Phone"),
//
//             // Save button
//             const SizedBox(height: 20),
//             SizedBox(
//               width: double.infinity,
//               height: 50,
//               child: ElevatedButton(
//                 onPressed: () {
//                   ScaffoldMessenger.of(context).showSnackBar(
//                     const SnackBar(content: Text("Profile Saved!")),
//                   );
//                 },
//                 style: ElevatedButton.styleFrom(
//                   backgroundColor: Colors.blueAccent,
//                   shape: RoundedRectangleBorder(
//                       borderRadius: BorderRadius.circular(12)),
//                 ),
//                 child: const Text("Save Changes",
//                     style: TextStyle(color: Colors.white, fontSize: 16)),
//               ),
//             ),
//             const SizedBox(height: 40),
//           ],
//         ),
//       ),
//     );
//   }
// }

import 'package:flutter/material.dart';

class ProfilePage extends StatefulWidget {
  final String name;
  final String age;
  final String gender;
  final String contact;
  final String allergies;
  final String medication;
  final String dob;
  final String condition;

  const ProfilePage({
    super.key,
    required this.name,
    required this.age,
    required this.gender,
    required this.contact,
    required this.allergies,
    required this.medication,
    required this.dob,
    required this.condition,
  });

  @override
  State<ProfilePage> createState() => _ProfilePageState();
}

class _ProfilePageState extends State<ProfilePage> {
  final Map<String, bool> enabledMap = {};
  final Map<String, TextEditingController> controllers = {};

  @override
  void initState() {
    super.initState();

    // ✅ Initialize all controllers with data passed from EditProfilePage
    controllers.addAll({
      "Full Name": TextEditingController(text: widget.name),
      "Date of Birth": TextEditingController(text: widget.dob),
      "Gender": TextEditingController(text: widget.gender),
      "Phone Number": TextEditingController(text: widget.contact),
      "Allergies": TextEditingController(text: widget.allergies),
      "Current Medications": TextEditingController(text: widget.medication),
      "Age": TextEditingController(text: widget.age),
      "Address": TextEditingController(text: ""),
      "Chronic Conditions": TextEditingController(text: ""),
      "Contact Name": TextEditingController(text: ""),
      "Relationship": TextEditingController(text: ""),
      "Contact Phone": TextEditingController(text: ""),
    });

    // Initially, all fields are disabled
    for (var key in controllers.keys) {
      enabledMap[key] = false;
    }
  }

  Widget buildTextField(String label, {bool multi = false}) {
    bool enabled = enabledMap[label] ?? false;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(label, style: const TextStyle(fontWeight: FontWeight.w600)),
        const SizedBox(height: 6),
        Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Expanded(
              child: TextFormField(
                controller: controllers[label],
                enabled: enabled,
                maxLines: multi ? 3 : 1,
                textInputAction: TextInputAction.done,
                onFieldSubmitted: (_) {
                  setState(() => enabledMap[label] = false);
                },
                decoration: InputDecoration(
                  filled: true,
                  fillColor: enabled ? Colors.white : Colors.grey[100],
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(12),
                    borderSide: const BorderSide(color: Colors.grey),
                  ),
                ),
              ),
            ),
            const SizedBox(width: 8),
            IconButton(
              onPressed: () {
                setState(() => enabledMap[label] = !enabled);
              },
              icon: Icon(
                enabled ? Icons.done : Icons.edit,
                color: Colors.blueAccent,
              ),
            ),
          ],
        ),
        const SizedBox(height: 16),
      ],
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        leading: const BackButton(color: Colors.black),
        backgroundColor: Colors.transparent,
        elevation: 0,
        title: const Text(
          "Profile",
          style: TextStyle(color: Colors.black, fontWeight: FontWeight.bold),
        ),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            // Profile header
            Stack(
              children: [
                CircleAvatar(
                  radius: 60,
                  backgroundImage: const AssetImage('assets/images/woman.png'),
                  backgroundColor: Colors.blue[50],
                ),
                Positioned(
                  bottom: 0,
                  right: 0,
                  child: CircleAvatar(
                    backgroundColor: Colors.blueAccent,
                    radius: 18,
                    child: const Icon(Icons.edit, size: 18, color: Colors.white),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 12),
            Text(widget.name,
                style:
                const TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
            const Text("Patient ID: 123456",
                style: TextStyle(color: Colors.grey)),
            const SizedBox(height: 24),

            // Personal Information
            const Align(
              alignment: Alignment.centerLeft,
              child: Text("Personal Information",
                  style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
            ),
            const SizedBox(height: 10),
            buildTextField("Full Name"),
            buildTextField("Date of Birth"),
            buildTextField("Age"),
            buildTextField("Gender"),
            buildTextField("Phone Number"),

            // Medical History
            const Align(
              alignment: Alignment.centerLeft,
              child: Text("Medical History",
                  style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
            ),
            const SizedBox(height: 10),
            buildTextField("Allergies", multi: true),
            buildTextField("Current Medications", multi: true),
            buildTextField("Chronic Conditions", multi: true),

            // Emergency Contacts
            const Align(
              alignment: Alignment.centerLeft,
              child: Text("Emergency Contacts",
                  style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
            ),
            const SizedBox(height: 10),
            buildTextField("Contact Name"),
            buildTextField("Relationship"),
            buildTextField("Contact Phone"),

            // Save button
            // const SizedBox(height: 20),
            // SizedBox(
            //   width: double.infinity,
            //   height: 50,
            //   child: ElevatedButton(
            //     onPressed: () {
            //       ScaffoldMessenger.of(context).showSnackBar(
            //         const SnackBar(content: Text("Profile Saved!")),
            //       );
            //     },
            //     style: ElevatedButton.styleFrom(
            //       backgroundColor: Colors.blueAccent,
            //       shape: RoundedRectangleBorder(
            //           borderRadius: BorderRadius.circular(12)),
            //     ),
            //     child: const Text("Save Changes",
            //         style: TextStyle(color: Colors.white, fontSize: 16)),
            //   ),
            // ),
            const SizedBox(height: 70),
          ],
        ),
      ),
    );
  }
}

