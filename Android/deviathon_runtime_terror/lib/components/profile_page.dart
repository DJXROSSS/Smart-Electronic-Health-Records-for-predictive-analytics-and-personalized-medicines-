import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import 'dart:convert';

class ProfilePage extends StatefulWidget {
  // No longer needs parameters, as it will fetch its own data.
  const ProfilePage({super.key});

  @override
  State<ProfilePage> createState() => _ProfilePageState();
}

class _ProfilePageState extends State<ProfilePage> {
  bool _isLoading = true;
  String? _errorMessage;
  String _userEmail = ''; // To store the logged-in user's email

  final Map<String, bool> enabledMap = {};
  final Map<String, TextEditingController> controllers = {
    // Initialize with empty controllers first
    "Full Name": TextEditingController(),
    "Date of Birth": TextEditingController(),
    "Gender": TextEditingController(),
    "Phone Number": TextEditingController(),
    "Allergies": TextEditingController(),
    "Current Medications": TextEditingController(),
    "Chronic Conditions": TextEditingController(),
    // Add other fields from your UI
    "Age": TextEditingController(),
    "Address": TextEditingController(),
    "Contact Name": TextEditingController(),
    "Relationship": TextEditingController(),
    "Contact Phone": TextEditingController(),
  };

  @override
  void initState() {
    super.initState();
    // Initially, all fields are disabled
    for (var key in controllers.keys) {
      enabledMap[key] = false;
    }
    _fetchUserProfile();
  }

  Future<void> _fetchUserProfile() async {
    final prefs = await SharedPreferences.getInstance();
    // Assuming you save the user's email with the key 'email' after login
    final email = prefs.getString('email');

    if (email == null) {
      setState(() {
        _isLoading = false;
        _errorMessage = "Could not find user email. Please log in again.";
      });
      return;
    }

    setState(() {
      _userEmail = email;
    });

    // Replace with your actual server IP address
    final url = Uri.parse('http://10.156.194.228:5000/api/user/profile/$email');

    try {
      final response = await http.get(url);

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        // Populate controllers with data from the database
        setState(() {
          controllers["Full Name"]?.text = data['name'] ?? '';
          controllers["Date of Birth"]?.text = data['dob'] ?? '';
          controllers["Gender"]?.text = data['gender'] ?? '';
          controllers["Phone Number"]?.text = data['contact'] ?? '';
          controllers["Allergies"]?.text = data['allergies'] ?? '';
          controllers["Current Medications"]?.text = data['medications'] ?? '';
          controllers["Chronic Conditions"]?.text = data['conditions'] ?? '';
          controllers["Age"]?.text = data['age']?.toString() ?? '';
          _isLoading = false;
        });
      } else {
        setState(() {
          _errorMessage = "Failed to load profile. Server returned ${response.statusCode}";
          _isLoading = false;
        });
      }
    } catch (e) {
      setState(() {
        _errorMessage = "Network error: $e";
        _isLoading = false;
      });
    }
  }

  Future<void> _saveProfileChanges() async {
    // Show a loading indicator on the button or screen
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text("Saving...")),
    );

    final url = Uri.parse('http://10.156.194.228:5000/api/user/profile/update');

    try {
      final response = await http.put(
        url,
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({
          'email': _userEmail, // Crucial for identifying which user to update
          'name': controllers['Full Name']?.text,
          'dob': controllers['Date of Birth']?.text,
          'gender': controllers['Gender']?.text,
          'contact': controllers['Phone Number']?.text,
          'allergies': controllers['Allergies']?.text,
          'medications': controllers['Current Medications']?.text,
          'conditions': controllers['Chronic Conditions']?.text,
          'age': int.tryParse(controllers['Age']?.text ?? '0'),
        }),
      );

      if (response.statusCode == 200) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(backgroundColor: Colors.green, content: Text("Profile Saved Successfully!")),
        );
        // Optionally disable all fields again after saving
        setState(() {
          for (var key in enabledMap.keys) {
            enabledMap[key] = false;
          }
        });
      } else {
        final errorData = jsonDecode(response.body);
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(backgroundColor: Colors.red, content: Text("Error: ${errorData['error']}")),
        );
      }

    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(backgroundColor: Colors.red, content: Text("Network Error: $e")),
      );
    }
  }

  @override
  void dispose() {
    // Clean up the controllers when the widget is disposed.
    for (var controller in controllers.values) {
      controller.dispose();
    }
    super.dispose();
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
      body: _isLoading
          ? const Center(child: CircularProgressIndicator())
          : _errorMessage != null
          ? Center(child: Text(_errorMessage!, style: const TextStyle(color: Colors.red)))
          : SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            // Profile Header
            buildProfileHeader(),
            const SizedBox(height: 24),

            // Sections
            buildSection("Personal Information", [
              "Full Name",
              "Date of Birth",
              "Age",
              "Gender",
              "Phone Number",
            ]),
            buildSection("Medical History", [
              "Allergies",
              "Current Medications",
              "Chronic Conditions",
            ], isMulti: true),
            buildSection("Emergency Contacts", [
              "Contact Name",
              "Relationship",
              "Contact Phone",
            ]),

            // Save Button
            const SizedBox(height: 20),
            SizedBox(
              width: double.infinity,
              height: 50,
              child: ElevatedButton(
                onPressed: _saveProfileChanges,
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.blueAccent,
                  shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(12)),
                ),
                child: const Text("Save Changes",
                    style: TextStyle(color: Colors.white, fontSize: 16)),
              ),
            ),
            const SizedBox(height: 40),
          ],
        ),
      ),
    );
  }

  // --- Helper Widgets for Cleaner Build Method ---

  Widget buildProfileHeader() {
    return Column(
      children: [
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
        // Use the controller's text for a dynamic name display
        Text(controllers["Full Name"]?.text ?? 'User Name',
            style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
        const Text("Patient ID: 123456", style: TextStyle(color: Colors.grey)),
      ],
    );
  }

  Widget buildSection(String title, List<String> fields, {bool isMulti = false}) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(title, style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
        const SizedBox(height: 10),
        ...fields.map((field) => buildTextField(field, multi: isMulti)).toList(),
      ],
    );
  }

  Widget buildTextField(String label, {bool multi = false}) {
    bool enabled = enabledMap[label] ?? false;
    return Padding(
      padding: const EdgeInsets.only(bottom: 16.0),
      child: Column(
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
                  onFieldSubmitted: (_) => setState(() => enabledMap[label] = false),
                  decoration: InputDecoration(
                    filled: true,
                    fillColor: enabled ? Colors.white : Colors.grey[200],
                    contentPadding: const EdgeInsets.symmetric(vertical: 10, horizontal: 12),
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(12),
                      borderSide: BorderSide(color: Colors.grey.shade300),
                    ),
                    enabledBorder: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(12),
                      borderSide: BorderSide(color: Colors.grey.shade300),
                    ),
                  ),
                ),
              ),
              const SizedBox(width: 8),
              IconButton(
                onPressed: () => setState(() => enabledMap[label] = !enabled),
                icon: Icon(enabled ? Icons.done : Icons.edit, color: Colors.blueAccent),
              ),
            ],
          ),
        ],
      ),
    );
  }
}