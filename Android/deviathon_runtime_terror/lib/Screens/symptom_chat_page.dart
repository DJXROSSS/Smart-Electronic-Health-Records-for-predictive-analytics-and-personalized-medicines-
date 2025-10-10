// import 'package:dash_chat_2/dash_chat_2.dart';
// import 'package:deviathon_runtime_terror/components/chat_bubble.dart';
// import 'package:flutter/material.dart';
// import 'package:google_generative_ai/google_generative_ai.dart';
//
//
// final String GEMINI_API_KEY = 'AIzaSyDshPC4rB6Jotl-CBVsRt84Ro9GRcDCr_s';
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
//   final ChatUser _geminiUser = ChatUser(id: '2', firstName: 'Med AI');
//
//   @override
//   void initState() {
//     super.initState();
//     _model = GenerativeModel(model: 'gemini-2.0-flash', apiKey: GEMINI_API_KEY);
//
//     // Start chat session
//     _session = _model.startChat();
//
//     // Send a hidden system prompt to set AI behavior
//     _session.sendMessage(Content.text("You are a compassionate, non-diagnostic AI assistant. Your primary goal is to gather more details to narrow down conditions. You must always maintain a helpful and non-alarming tone. After gathering 2-3 pieces of clarifying information, generate a final summary with possible causes and politely suggest seeing a doctor. You are supposed to give short and concise answer with only the most relevant information. you are not to use markdown when giving responses. if the user gives an irrelevant response deviating from the symptoms then you are to politely refuse and ask the user to rephrase their symptoms."));
//
//     // Add visible greeting to user
//     _messages.add({
//       "text": "What Symptoms are you experiencing?",
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
//                 final msg = _messages[_messages.length - 1 - index];
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
//                   const Text("Med AI is typing...", style: TextStyle(color: Colors.grey)),
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

import 'package:deviathon_runtime_terror/Screens/book_appointment_page.dart';
import 'package:deviathon_runtime_terror/components/chat_bubble.dart';
import 'package:flutter/material.dart';
import 'package:google_generative_ai/google_generative_ai.dart';

final String GEMINI_API_KEY = 'AIzaSyDshPC4rB6Jotl-CBVsRt84Ro9GRcDCr_s'; // <-- Replace this safely

class SymptomChatPage extends StatefulWidget {
  const SymptomChatPage({Key? key}) : super(key: key);

  @override
  State<SymptomChatPage> createState() => _SymptomChatPageState();
}

class _SymptomChatPageState extends State<SymptomChatPage> {
  final TextEditingController _inputController = TextEditingController();
  final List<Map<String, dynamic>> _messages = [];
  final List<Map<String, String>> _conversationLog = []; // ✅ stores user-AI pairs
  bool _isTyping = false;
  bool _showBookButton = false;

  late GenerativeModel _model;
  late ChatSession _session;

  @override
  void initState() {
    super.initState();
    _model = GenerativeModel(model: 'gemini-2.0-flash', apiKey: GEMINI_API_KEY);

    _session = _model.startChat();

    // Set system context for the AI
    _session.sendMessage(Content.text(
      "You are a compassionate, non-diagnostic AI health assistant."
          "Your primary goal is to understand the user’s symptoms clearly and narrow down possible conditions in a safe and responsible way. "
          "You are supposed to give short and concise answer with only the most relevant information."
          "You must maintain a reassuring, and non-alarming tone throughout the conversation."
          "1️⃣ Start by greeting the user and asking what symptoms they are currently experiencing."
          "2️⃣ Ask up to 5-6 short and relevant follow-up questions (at least 3) to clarify duration, severity, and related symptoms."
          "3️⃣ After sufficient information is gathered, generate a **concise final message** containing:"
          "  - A short summary of the user’s condition."
          "  - 2–3 possible causes."
          "  - Common home remedies or OTC medications (if suitable)."
          "  - A gentle recommendation to consult a doctor."
          "End this visible user message with the tag: [FINAL_DIAGNOSIS]"
          "Do not use markdown, emojis, or bullet points with special symbols — keep responses in clear plain text."
          "If the user’s message is irrelevant or unrelated to symptoms, politely ask them to rephrase or provide relevant medical details."

          "After generating the final report, generate a hidden section for clinical insight using this format:"
          "[DOCTOR_RESPONSE]"
          "Diagnosis Summary: (brief summary)"
          "Possible Conditions: (list of suspected diseases or conditions)"
          "Reasoning: (short explanation of how these were inferred based on symptoms, medical patterns, and risk factors)"
          "Confidence Factors: (mention any indicators or symptoms that strongly influenced the reasoning)"
          "[/DOCTOR_RESPONSE]"

          "This section is **for doctor use only** and will not be shown to the user. It should be factual, medically reasoned, and professional in tone."
    ));

    // Initial greeting
    _messages.add({
      "text": "What symptoms are you experiencing?",
      "isUser": false,
    });
  }

  void _sendMessage(String text) {
    if (text.trim().isEmpty) return;

    setState(() {
      _messages.add({"text": text, "isUser": true});
      _conversationLog.add({"role": "user", "message": text});
      _isTyping = true;
    });

    _inputController.clear();
    _getGeminiResponse(text);
  }

  Future<void> _getGeminiResponse(String message) async {
    try {
      final response = await _session.sendMessage(Content.text(message));
      final reply = response.text ?? "⚠️ Gemini didn't return a response.";

      setState(() {
        _messages.add({"text": reply, "isUser": false});
        _conversationLog.add({"role": "ai", "message": reply});
      });

      // ✅ Detect AI's final response
      if (reply.contains("[FINAL_DIAGNOSIS]")) {
        setState(() {
          _showBookButton = true;
        });
      }
    } catch (e) {
      setState(() {
        _messages.add({
          "text": "⚠️ Error: ${e.toString()}",
          "isUser": false,
        });
      });
    } finally {
      setState(() {
        _isTyping = false;
      });
    }
  }

  void _bookAppointment() {
    Navigator.push(
      context,
      MaterialPageRoute(builder: (_) => const BookAppointmentPage()),
    );
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
                return Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    ChatBubble(
                      text: msg["text"],
                      isUser: msg["isUser"],
                    ),
                    if (!_isTyping &&
                        _showBookButton &&
                        !msg["isUser"] &&
                        msg["text"].contains("[FINAL_DIAGNOSIS]"))
                      Padding(
                        padding: const EdgeInsets.only(left: 60.0, top: 6),
                        child: ElevatedButton.icon(
                          onPressed: _bookAppointment,
                          style: ElevatedButton.styleFrom(
                            backgroundColor: Colors.blueAccent,
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(20),
                            ),
                          ),
                          icon: const Icon(Icons.calendar_today, color: Colors.white),
                          label: const Text(
                            "Book Appointment",
                            style: TextStyle(color: Colors.white),
                          ),
                        ),
                      ),
                  ],
                );
              },
            ),
          ),
          if (_isTyping)
            Padding(
              padding: const EdgeInsets.symmetric(vertical: 6),
              child: Row(
                children: const [
                  SizedBox(width: 12),
                  SizedBox(
                      width: 18,
                      height: 18,
                      child: CircularProgressIndicator(strokeWidth: 2)),
                  SizedBox(width: 8),
                  Text("Med AI is typing...",
                      style: TextStyle(color: Colors.grey)),
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
                  onPressed:
                  _isTyping ? null : () => _sendMessage(_inputController.text),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
