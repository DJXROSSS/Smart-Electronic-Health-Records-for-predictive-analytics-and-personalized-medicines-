import 'package:deviathon_runtime_terror/Screens/history_page.dart';
import 'package:deviathon_runtime_terror/components/ai_insight_card.dart';
import 'package:deviathon_runtime_terror/components/history_card.dart';
import 'package:deviathon_runtime_terror/components/recent_symptoms_card.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart'; // ✅ 1. Import shared_preferences

// ✅ 2. Convert to a StatefulWidget
class DashboardPage extends StatefulWidget {
  const DashboardPage({super.key});

  @override
  State<DashboardPage> createState() => _DashboardPageState();
}

class _DashboardPageState extends State<DashboardPage> {
  // ✅ 3. Create a state variable to hold the user's name
  String _userName = 'User'; // A default value
  bool _isLoading = true;

  @override
  void initState() {
    super.initState();
    // ✅ 4. Call the function to load the name when the page opens
    _loadUserName();
  }

  Future<void> _loadUserName() async {
    final prefs = await SharedPreferences.getInstance();
    // Use the key 'name' that you saved during the login process
    final savedName = prefs.getString('name');

    if (savedName != null && savedName.isNotEmpty) {
      // If a name is found, update the state to display it
      setState(() {
        _userName = savedName;
      });
    }
    // Set loading to false after attempting to load the name
    setState(() {
      _isLoading = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey[100],
      appBar: AppBar(
        elevation: 0,
        backgroundColor: Colors.transparent,
        title: const Text(
          "MedVault", // Changed from EHR System 1
          style: TextStyle(
            color: Colors.black87,
            fontWeight: FontWeight.w700,
            fontSize: 20,
          ),
        ),
        centerTitle: false,
        iconTheme: const IconThemeData(color: Colors.black87),
        automaticallyImplyLeading: false, // Prevents a back button from appearing
      ),
      body: _isLoading
          ? const Center(child: CircularProgressIndicator()) // Show a loading circle while fetching name
          : SingleChildScrollView(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const SizedBox(height: 10),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text(
                  "Welcome back,",
                  style: TextStyle(fontSize: 14, color: Colors.black54),
                ),
                // ✅ 5. Use the state variable here instead of a hardcoded name
                Text(_userName,
                    style: const TextStyle(
                        fontSize: 42, fontWeight: FontWeight.bold)),
              ],
            ),
            const SizedBox(height: 35),

            const Text("My Recent Symptoms",
                style:
                TextStyle(fontSize: 20, fontWeight: FontWeight.w600)),
            const SizedBox(height: 10),
            const RecentSymptomsCard(),

            const SizedBox(height: 25),
            const Text("AI Insights",
                style:
                TextStyle(fontSize: 20, fontWeight: FontWeight.w600)),
            const SizedBox(height: 10),
            const AIInsightCard(),

            const SizedBox(height: 25),
            const Text("History",
                style:
                TextStyle(fontSize: 20, fontWeight: FontWeight.w600)),
            const SizedBox(height: 10),
            const HistoryCard(
                id: "0001",
                doctor: "Dr. John Smith",
                date: "Jan 15, 2025",
                symptoms: "Fever, fatigue",
                diagnosis: "Flu",
                prescription: "Paracetamol, rest"),
            const HistoryCard(
                id: "0002",
                doctor: "Dr. Amelia Lee",
                date: "Dec 18, 2024",
                symptoms: "Cough",
                diagnosis: "Bronchitis",
                prescription: "Azithromycin, steam inhalation"),

            const SizedBox(height: 10),
            SizedBox(
              width: double.infinity,
              height: 50,
              child: ElevatedButton(
                onPressed: () {
                  Navigator.push(
                      context,
                      MaterialPageRoute(
                          builder: (_) => const HistoryPage()));
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.blueAccent,
                  shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(12)),
                ),
                child: const Text("Show More",
                    style: TextStyle(color: Colors.white, fontSize: 16)),
              ),
            ),
            const SizedBox(height: 70),
          ],
        ),
      ),
    );
  }
}