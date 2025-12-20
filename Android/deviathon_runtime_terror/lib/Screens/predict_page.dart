import 'package:flutter/material.dart';
import '../Services/api_service.dart';

class PredictPage extends StatefulWidget {
  const PredictPage({super.key});

  @override
  State<PredictPage> createState() => _PredictPageState();
}

class _PredictPageState extends State<PredictPage> {
  final TextEditingController _controller = TextEditingController();
  String? predictedDisease;
  String? explanation;
  bool isLoading = false;

  void predict() async {
    final symptoms = _controller.text.trim();
    if (symptoms.isEmpty) return;

    setState(() => isLoading = true);

    try {
      final result = await ApiService.predictDisease(symptoms);
      setState(() {
        predictedDisease = result["predicted_disease"];
        explanation = result["explanation"];
      });
    } catch (e) {
      setState(() {
        predictedDisease = "Error occurred!";
        explanation = e.toString();
      });
    } finally {
      setState(() => isLoading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Disease Predictor")),
      body: Padding(
        padding: const EdgeInsets.all(20.0),
        child: Column(
          children: [
            TextField(
              controller: _controller,
              decoration: const InputDecoration(
                labelText: "Enter Symptoms",
                border: OutlineInputBorder(),
              ),
              maxLines: 3,
            ),
            const SizedBox(height: 16),
            ElevatedButton(
              onPressed: isLoading ? null : predict,
              child: isLoading
                  ? const CircularProgressIndicator(color: Colors.white)
                  : const Text("Predict Disease"),
            ),
            const SizedBox(height: 30),
            if (predictedDisease != null) ...[
              Text(
                "Disease: $predictedDisease",
                style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 10),
              Text(
                "Explanation: $explanation",
                style: const TextStyle(fontSize: 16),
              ),
            ],
          ],
        ),
      ),
    );
  }
}
