import 'package:flutter/material.dart';

class DiseaseInfoPage extends StatelessWidget {
  const DiseaseInfoPage({Key? key}) : super(key: key);

  Widget infoCard(String title, String content) {
    return Card(
      elevation: 3,
      margin: const EdgeInsets.only(bottom: 20),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(title, style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w600)),
            const SizedBox(height: 8),
            Text(content, style: const TextStyle(color: Colors.black87, height: 1.4)),
          ],
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Flu Information")),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: ListView(
          children: [
            infoCard(
              "Brief Information",
              "The flu is a contagious respiratory illness caused by influenza viruses. It can lead to fever, cough, sore throat, muscle aches, and fatigue.",
            ),
            infoCard(
              "Common Symptoms",
              "• Fever\n• Cough\n• Fatigue\n• Body ache\n• Sore throat",
            ),
            infoCard(
              "Remedies / OTC Medications",
              "• Rest and drink plenty of fluids.\n• Paracetamol or ibuprofen for fever.\n• Warm fluids and steam inhalation.",
            ),
          ],
        ),
      ),
    );
  }
}
