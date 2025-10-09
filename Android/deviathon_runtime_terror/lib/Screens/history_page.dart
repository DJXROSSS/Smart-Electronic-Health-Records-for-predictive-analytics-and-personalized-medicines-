import 'package:deviathon_runtime_terror/components/history_card.dart';
import 'package:flutter/material.dart';

class HistoryPage extends StatelessWidget {
  const HistoryPage({Key? key}) : super(key: key);

  final List<Map<String, String>> history = const [
    {
      "id": "0001",
      "doctor": "Dr. John Smith",
      "date": "Jan 15, 2025",
      "symptoms": "Fever, fatigue",
      "diagnosis": "Flu",
      "prescription": "Paracetamol, rest"
    },
    {
      "id": "0002",
      "doctor": "Dr. Amelia Lee",
      "date": "Dec 18, 2024",
      "symptoms": "Cough, throat pain",
      "diagnosis": "Bronchitis",
      "prescription": "Azithromycin, steam inhalation"
    },
    {
      "id": "0003",
      "doctor": "Dr. Kevin Brown",
      "date": "Nov 20, 2024",
      "symptoms": "Headache, nausea",
      "diagnosis": "Migraine",
      "prescription": "Ibuprofen, rest, hydration"
    },
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Medical History")),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: ListView.builder(
          itemCount: history.length,
          itemBuilder: (context, index) {
            final h = history[index];
            return HistoryCard(
              id: h["id"]!,
              doctor: h["doctor"]!,
              date: h["date"]!,
              symptoms: h["symptoms"]!,
              diagnosis: h["diagnosis"]!,
              prescription: h["prescription"]!,
            );
          },
        ),
      ),
    );
  }
}
