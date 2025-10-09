import 'package:deviathon_runtime_terror/components/ai_insight_card.dart';
import 'package:deviathon_runtime_terror/components/history_card.dart';
import 'package:deviathon_runtime_terror/components/recent_symptoms_card.dart';
import 'package:flutter/material.dart';

class DashboardPage extends StatelessWidget {
  const DashboardPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    const username = "Sophia";

    return Scaffold(
      backgroundColor: Colors.grey[100],
      appBar: AppBar(
        elevation: 0,
        backgroundColor: Colors.transparent,
        title: const Text(
          "EHR System 1",
          style: TextStyle(
            color: Colors.black87,
            fontWeight: FontWeight.w700,
            fontSize: 20,
          ),
        ),
        centerTitle: true,
        iconTheme: const IconThemeData(color: Colors.black87),
      ),

      body: SingleChildScrollView(
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
                Text(username,
                    style: const TextStyle(fontSize: 22, fontWeight: FontWeight.bold)),
              ],
            ),
            const SizedBox(height: 25),

            const Text("My Symptoms", style: TextStyle(fontSize: 20, fontWeight: FontWeight.w600)),
            const SizedBox(height: 10),
            const RecentSymptomsCard(),

            const SizedBox(height: 25),
            const Text("AI Insights", style: TextStyle(fontSize: 20, fontWeight: FontWeight.w600)),
            const SizedBox(height: 10),
            const AIInsightCard(),

            const SizedBox(height: 25),
            const Text("History", style: TextStyle(fontSize: 20, fontWeight: FontWeight.w600)),
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
          ],
        ),
      ),
    );
  }
}
