import 'package:deviathon_runtime_terror/components/chat_bubble.dart';
import 'package:flutter/material.dart';

class SymptomChatPage extends StatefulWidget {
  const SymptomChatPage({Key? key}) : super(key: key);

  @override
  State<SymptomChatPage> createState() => _SymptomChatPageState();
}

class _SymptomChatPageState extends State<SymptomChatPage> {
  final TextEditingController _inputController = TextEditingController();
  final List<Map<String, dynamic>> _messages = [];
  int _step = 0;
  String _symptomSummary = "";

  // mock AI logic (you can replace this with real API later)
  final List<Map<String, dynamic>> _questions = [
    {"q": "What symptoms are you experiencing?"},
    {"q": "How long have you had these symptoms?"},
    {"q": "Do you have a fever or cough?"},
    {"q": "Have you taken any medication recently?"},
  ];

  void _sendMessage(String text) {
    if (text.trim().isEmpty) return;

    setState(() {
      _messages.add({"text": text, "isUser": true});
    });

    _inputController.clear();

    Future.delayed(const Duration(milliseconds: 600), () {
      _getAIResponse(text);
    });
  }

  void _getAIResponse(String userInput) {
    if (_step < _questions.length - 1) {
      setState(() {
        _messages.add({
          "text": _questions[_step + 1]["q"],
          "isUser": false,
        });
        _symptomSummary += "$userInput, ";
        _step++;
      });
    } else {
      // Final AI "diagnosis"
      setState(() {
        _symptomSummary += userInput;
        final diagnosis = _generateDiagnosis(_symptomSummary);
        _messages.add({
          "text": "Based on your answers, possible causes could be:\n\n$diagnosis",
          "isUser": false,
        });
        _messages.add({
          "text":
          "Would you like to view remedies or book an appointment with a doctor?",
          "isUser": false,
        });
      });
    }
  }

  String _generateDiagnosis(String summary) {
    summary = summary.toLowerCase();
    if (summary.contains("cough") || summary.contains("fever")) {
      return "• Common Cold or Flu\n• Viral Infection";
    } else if (summary.contains("headache")) {
      return "• Migraine\n• Dehydration\n• Eye strain";
    } else if (summary.contains("stomach")) {
      return "• Indigestion\n• Food poisoning";
    } else {
      return "• Fatigue or minor infection";
    }
  }

  @override
  void initState() {
    super.initState();
    _messages.add({"text": _questions[0]["q"], "isUser": false});
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Symptom Chat"),
        backgroundColor: Colors.blueAccent,
      ),
      body: Column(
        children: [
          Expanded(
            child: ListView.builder(
              padding: const EdgeInsets.all(12),
              itemCount: _messages.length,
              itemBuilder: (context, index) {
                final msg = _messages[index];
                return ChatBubble(
                  text: msg["text"],
                  isUser: msg["isUser"],
                );
              },
            ),
          ),
          Container(
            color: Colors.white,
            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 8),
            child: Row(
              children: [
                Expanded(
                  child: TextField(
                    controller: _inputController,
                    textInputAction: TextInputAction.send,
                    onSubmitted: _sendMessage,
                    decoration: InputDecoration(
                      hintText: "Type your answer...",
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(20),
                      ),
                      contentPadding:
                      const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
                    ),
                  ),
                ),
                const SizedBox(width: 8),
                IconButton(
                  icon: const Icon(Icons.send, color: Colors.blueAccent),
                  onPressed: () => _sendMessage(_inputController.text),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
