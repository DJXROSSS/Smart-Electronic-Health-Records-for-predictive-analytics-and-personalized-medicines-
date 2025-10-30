import 'package:deviathon_runtime_terror/Screens/book_appointment_page.dart';
import 'package:flutter/material.dart';
import 'package:google_generative_ai/google_generative_ai.dart';

// --- Placeholder for your existing ChatBubble component ---
// You can replace this with your actual ChatBubble implementation.
class ChatBubble extends StatelessWidget {
  final String text;
  final bool isUser;

  const ChatBubble({Key? key, required this.text, required this.isUser})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Align(
      alignment: isUser ? Alignment.centerRight : Alignment.centerLeft,
      child: Container(
        constraints: BoxConstraints(maxWidth: MediaQuery.of(context).size.width * 0.75),
        margin: const EdgeInsets.symmetric(vertical: 5),
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
        decoration: BoxDecoration(
          color: isUser ? const Color(0xFF0D47A1) : Colors.white,
          borderRadius: BorderRadius.only(
            topLeft: const Radius.circular(20),
            topRight: const Radius.circular(20),
            bottomLeft:
            isUser ? const Radius.circular(20) : const Radius.circular(0),
            bottomRight:
            isUser ? const Radius.circular(0) : const Radius.circular(20),
          ),
          boxShadow: [
            BoxShadow(
              color: Colors.grey.withOpacity(0.1),
              spreadRadius: 1,
              blurRadius: 5,
            )
          ],
        ),
        child: Text(
          text,
          style: TextStyle(color: isUser ? Colors.white : Colors.black87),
        ),
      ),
    );
  }
}
// --- End of Placeholder ---

final String GEMINI_API_KEY = 'AIzaSyDshPC4rB6Jotl-CBVsRt84Ro9GRcDCr_s';

class SymptomChatPage extends StatefulWidget {
  const SymptomChatPage({Key? key}) : super(key: key);

  @override
  State<SymptomChatPage> createState() => _SymptomChatPageState();
}

class _SymptomChatPageState extends State<SymptomChatPage> {
  final TextEditingController _inputController = TextEditingController();
  final List<Map<String, dynamic>> _messages = [];
  final List<Map<String, String>> _conversationLog = [];
  bool _isTyping = false;
  bool _showBookButton = false;

  late GenerativeModel _model;
  late ChatSession _session;

  @override
  void initState() {
    super.initState();
    _model = GenerativeModel(model: 'gemini-2.0-flash', apiKey: GEMINI_API_KEY);
    _session = _model.startChat();

    // The Gemini prompt is unchanged as requested.
    _session.sendMessage(Content.text(
        "You are a compassionate, non-diagnostic AI health assistant."
            "Your primary goal is to understand the user’s symptoms clearly and narrow down possible conditions in a safe and responsible way. "
            "You are supposed to give short and concise answer with only the most relevant information."
            "You must maintain a reassuring, and non-alarming tone throughout the conversation."
            "1️⃣ Start by greeting the user and asking what symptoms they are currently experiencing."
            "2️⃣ Ask up to 4-6 short and relevant follow-up questions to clarify duration, severity, and related symptoms."
            "3️⃣ After sufficient information is gathered, generate a **concise final message** containing:"
            "  - A short summary of the user’s condition."
            "  - 2–3 possible causes."
            "  - Common home remedies or OTC medications (if suitable)."
            "  - A gentle recommendation to consult a doctor."
            "End this visible user message with the tag: [FINAL_DIAGNOSIS]"
            "Do not use markdown, emojis, or bullet points with special symbols — keep responses in clear plain text."
            "If the user’s message is irrelevant or unrelated to symptoms, politely ask them to rephrase or provide relevant medical details."

    ));

    // Initial greeting
    _messages.add({
      "text": "Hello! I'm your AI health assistant. What symptoms are you experiencing today?",
      "isUser": false,
    });
  }

  void _sendMessage(String text) {
    if (text.trim().isEmpty) return;

    setState(() {
      _messages.add({"text": text, "isUser": true});
      _conversationLog.add({"role": "user", "message": text});
      _isTyping = true;
      _showBookButton = false; // Hide button when user sends a new message
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
    const primaryColor = Color(0xFF0D47A1);

    return Scaffold(
      backgroundColor: const Color(0xFFF4F6F8),
      appBar: AppBar(
        elevation: 1,
        shadowColor: Colors.black26,
        backgroundColor: primaryColor,
        iconTheme: const IconThemeData(color: Colors.white),
        title: const Text("AI Symptom Checker", style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
      ),
      body: Column(
        children: [
          Expanded(
            child: ListView.builder(
              padding: const EdgeInsets.all(16),
              reverse: true,
              itemCount: _messages.length,
              itemBuilder: (context, index) {
                final msg = _messages.reversed.toList()[index];
                final isLastMessage = index == 0;

                return Column(
                  crossAxisAlignment: msg["isUser"] ? CrossAxisAlignment.end : CrossAxisAlignment.start,
                  children: [
                    ChatBubble(
                      text: msg["text"].replaceAll("[FINAL_DIAGNOSIS]", "").trim(),
                      isUser: msg["isUser"],
                    ),
                    if (isLastMessage && !_isTyping && _showBookButton && !msg["isUser"] && msg["text"].contains("[FINAL_DIAGNOSIS]"))
                      Padding(
                        padding: const EdgeInsets.only(top: 12, left: 16.0),
                        child: ElevatedButton.icon(
                          onPressed: _bookAppointment,
                          style: ElevatedButton.styleFrom(
                            backgroundColor: const Color(0xFF42A5F5),
                            foregroundColor: Colors.white,
                            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
                            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                            elevation: 2,
                          ),
                          icon: const Icon(Icons.calendar_today, size: 20),
                          label: const Text("Book Appointment"),
                        ),
                      ),
                  ],
                );
              },
            ),
          ),
          if (_isTyping)
            const Padding(
              padding: EdgeInsets.symmetric(vertical: 10, horizontal: 16),
              child: TypingIndicator(),
            ),
          _buildMessageInput(),
        ],
      ),
    );
  }

  Widget _buildMessageInput() {
    const primaryColor = Color(0xFF0D47A1);

    return Container(
      decoration: BoxDecoration(
        color: Colors.white,
        boxShadow: [
          BoxShadow(
            color: Colors.grey.withOpacity(0.1),
            spreadRadius: 1,
            blurRadius: 10,
            offset: const Offset(0, -2),
          ),
        ],
      ),
      padding: const EdgeInsets.all(12.0),
      child: SafeArea(
        child: Row(
          children: [
            Expanded(
              child: TextField(
                controller: _inputController,
                textInputAction: TextInputAction.send,
                onSubmitted: _isTyping ? null : _sendMessage,
                decoration: InputDecoration(
                  hintText: "Describe your symptoms...",
                  filled: true,
                  fillColor: const Color(0xFFF4F6F8),
                  contentPadding: const EdgeInsets.symmetric(horizontal: 20, vertical: 14),
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(30),
                    borderSide: BorderSide.none,
                  ),
                ),
              ),
            ),
            const SizedBox(width: 12),
            Material(
              color: primaryColor,
              borderRadius: BorderRadius.circular(24),
              child: InkWell(
                borderRadius: BorderRadius.circular(24),
                onTap: _isTyping ? null : () => _sendMessage(_inputController.text),
                child: const Padding(
                  padding: EdgeInsets.all(12.0),
                  child: Icon(Icons.send, color: Colors.white, size: 24),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class TypingIndicator extends StatelessWidget {
  const TypingIndicator({super.key});

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        CircleAvatar(
          radius: 16,
          backgroundColor: const Color(0xFF0D47A1).withOpacity(0.1),
          child: const Icon(Icons.support_agent, size: 20, color: Color(0xFF0D47A1)),
        ),
        const SizedBox(width: 12),
        Text("Med AI is typing...", style: TextStyle(color: Colors.grey[600])),
      ],
    );
  }
}
