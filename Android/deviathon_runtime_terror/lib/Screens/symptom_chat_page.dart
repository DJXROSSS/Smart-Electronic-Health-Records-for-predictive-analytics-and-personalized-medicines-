// import 'package:dash_chat_2/dash_chat_2.dart';
// import 'package:deviathon_runtime_terror/components/chat_bubble.dart';
// import 'package:flutter/material.dart';
// import 'package:google_generative_ai/google_generative_ai.dart';
//
// const String GEMINI_API_KEY = 'AIzaSyDiJdc4J3yNQy1hWsCnY-_oTiykZmq4GME';
//
// class SymptomChatPage extends StatefulWidget {
//   const SymptomChatPage({Key? key}) : super(key: key);
//
//   @override
//   State<SymptomChatPage> createState() => _SymptomChatPageState();
// }
//
// class _SymptomChatPageState extends State<SymptomChatPage> {
//   final TextEditingController _inputController = TextEditingController();
//   final List<Map<String, dynamic>> _messages = [];
//   bool _isTyping = false;
//
//   late GenerativeModel _model;
//   late ChatSession _session;
//
//   final ChatUser _geminiUser = ChatUser(id: '2', firstName: 'Krishi Saarthi');
//
//   @override
//   void initState() {
//     super.initState();
//     _model = GenerativeModel(model: 'gemini-2.0-flash', apiKey: GEMINI_API_KEY);
//     _session = _model.startChat();
//
//     // Optional: Add a greeting from the bot
//     _messages.add({
//       "text": "What Symptoms are you experincing?",
//       "isUser": false,
//     });
//   }
//
//   void _sendMessage(String text) {
//     if (text.trim().isEmpty) return;
//
//     setState(() {
//       _messages.add({"text": text, "isUser": true});
//       _isTyping = true;
//     });
//
//     _inputController.clear();
//
//     _getGeminiResponse(text);
//   }
//
//   Future<void> _getGeminiResponse(String message) async {
//     try {
//       final content = Content.text(message);
//       final response = await _session.sendMessage(content);
//       final reply = response.text ?? "⚠️ Gemini didn't return a response.";
//
//       setState(() {
//         _messages.add({
//           "text": reply,
//           "isUser": false,
//         });
//       });
//     } catch (e) {
//       setState(() {
//         _messages.add({
//           "text": '⚠️ Error: ${e.toString()}',
//           "isUser": false,
//         });
//       });
//     } finally {
//       setState(() {
//         _isTyping = false;
//       });
//     }
//   }
//
//   @override
//   Widget build(BuildContext context) {
//     return Scaffold(
//       appBar: AppBar(
//         title: const Text("Symptom Chat"),
//         backgroundColor: Colors.blueAccent,
//       ),
//       body: Column(
//         children: [
//           Expanded(
//             child: ListView.builder(
//               padding: const EdgeInsets.all(12),
//               reverse: true,
//               itemCount: _messages.length,
//               itemBuilder: (context, index) {
//                 final msg = _messages[_messages.length - 1 - index]; // reverse order
//                 return ChatBubble(
//                   text: msg["text"],
//                   isUser: msg["isUser"],
//                 );
//               },
//             ),
//           ),
//           if (_isTyping)
//             Padding(
//               padding: const EdgeInsets.symmetric(vertical: 6),
//               child: Row(
//                 children: [
//                   const SizedBox(width: 12),
//                   CircularProgressIndicator(strokeWidth: 2, color: Colors.blueAccent),
//                   const SizedBox(width: 8),
//                   const Text("Krishi Saarthi is typing...", style: TextStyle(color: Colors.grey)),
//                 ],
//               ),
//             ),
//           Container(
//             color: Colors.white,
//             padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 8),
//             child: Row(
//               children: [
//                 Expanded(
//                   child: TextField(
//                     controller: _inputController,
//                     textInputAction: TextInputAction.send,
//                     onSubmitted: _sendMessage,
//                     decoration: InputDecoration(
//                       hintText: "Type your message...",
//                       border: OutlineInputBorder(
//                         borderRadius: BorderRadius.circular(20),
//                       ),
//                       contentPadding:
//                       const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
//                     ),
//                   ),
//                 ),
//                 const SizedBox(width: 8),
//                 IconButton(
//                   icon: const Icon(Icons.send, color: Colors.blueAccent),
//                   onPressed: _isTyping ? null : () => _sendMessage(_inputController.text),
//                 ),
//               ],
//             ),
//           ),
//         ],
//       ),
//     );
//   }
// }

import 'package:dash_chat_2/dash_chat_2.dart';
import 'package:deviathon_runtime_terror/components/chat_bubble.dart';
import 'package:flutter/material.dart';
import 'package:google_generative_ai/google_generative_ai.dart';

const String GEMINI_API_KEY = 'AIzaSyDrktuyFUROh8G1JXGh5OO5ab_PjmKYRgA';

class SymptomChatPage extends StatefulWidget {
  const SymptomChatPage({Key? key}) : super(key: key);

  @override
  State<SymptomChatPage> createState() => _SymptomChatPageState();
}

class _SymptomChatPageState extends State<SymptomChatPage> {
  final TextEditingController _inputController = TextEditingController();
  final List<Map<String, dynamic>> _messages = [];
  bool _isTyping = false;

  late GenerativeModel _model;
  late ChatSession _session;

  final ChatUser _geminiUser = ChatUser(id: '2', firstName: 'Med AI');

  @override
  void initState() {
    super.initState();
    _model = GenerativeModel(model: 'gemini-2.0-flash', apiKey: GEMINI_API_KEY);

    // Start chat session
    _session = _model.startChat();

    // Send a hidden system prompt to set AI behavior
    _session.sendMessage(Content.text("You are a compassionate, non-diagnostic AI assistant. Your primary goal is to gather more details to narrow down conditions. You must always maintain a helpful and non-alarming tone. After gathering 2-3 pieces of clarifying information, generate a final summary with possible causes and politely suggest seeing a doctor. You are supposed to give short and concise answer with only the most relevant information. you are not to use markdown when giving responses. if the user gives an irrelevant response deviating from the symptoms then you are to politely refuse and ask the user to rephrase their symptoms."));

    // Add visible greeting to user
    _messages.add({
      "text": "What Symptoms are you experiencing?",
      "isUser": false,
    });
  }

  void _sendMessage(String text) {
    if (text.trim().isEmpty) return;

    setState(() {
      _messages.add({"text": text, "isUser": true});
      _isTyping = true;
    });

    _inputController.clear();

    _getGeminiResponse(text);
  }

  Future<void> _getGeminiResponse(String message) async {
    try {
      final content = Content.text(message);
      final response = await _session.sendMessage(content);
      final reply = response.text ?? "⚠️ Gemini didn't return a response.";

      setState(() {
        _messages.add({
          "text": reply,
          "isUser": false,
        });
      });
    } catch (e) {
      setState(() {
        _messages.add({
          "text": '⚠️ Error: ${e.toString()}',
          "isUser": false,
        });
      });
    } finally {
      setState(() {
        _isTyping = false;
      });
    }
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
              reverse: true,
              itemCount: _messages.length,
              itemBuilder: (context, index) {
                final msg = _messages[_messages.length - 1 - index];
                return ChatBubble(
                  text: msg["text"],
                  isUser: msg["isUser"],
                );
              },
            ),
          ),
          if (_isTyping)
            Padding(
              padding: const EdgeInsets.symmetric(vertical: 6),
              child: Row(
                children: [
                  const SizedBox(width: 12),
                  CircularProgressIndicator(strokeWidth: 2, color: Colors.blueAccent),
                  const SizedBox(width: 8),
                  const Text("Med AI is typing...", style: TextStyle(color: Colors.grey)),
                ],
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
                      hintText: "Type your message...",
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
                  onPressed: _isTyping ? null : () => _sendMessage(_inputController.text),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
