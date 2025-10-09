import 'package:flutter/material.dart';
import '../Screens/history_page.dart';

class RecentSymptomsCard extends StatelessWidget {
  const RecentSymptomsCard({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        Navigator.push(context, MaterialPageRoute(builder: (_) => const HistoryPage()));
      },
      child: Card(
        elevation: 3,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Row(
                children: const [
                  Icon(Icons.health_and_safety_outlined, color: Colors.blueAccent, size: 28),
                  SizedBox(width: 12),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        "Recent Symptoms",
                        style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600),
                      ),
                      SizedBox(height: 4),
                      Text("Fever, cough, fatigue", style: TextStyle(color: Colors.black54)),
                    ],
                  ),
                ],
              ),
              const Icon(Icons.add_circle, color: Colors.blueAccent, size: 32),
            ],
          ),
        ),
      ),
    );
  }
}
