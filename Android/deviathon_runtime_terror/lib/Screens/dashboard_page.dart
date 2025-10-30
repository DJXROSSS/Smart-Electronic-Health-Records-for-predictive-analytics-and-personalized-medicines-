import 'package:deviathon_runtime_terror/Screens/history_page.dart';
import 'package:deviathon_runtime_terror/components/ai_insight_card.dart';
import 'package:deviathon_runtime_terror/components/history_card.dart';
import 'package:deviathon_runtime_terror/components/recent_symptoms_card.dart';
import 'package:flutter/material.dart';
import 'dart:convert';
import 'package:shimmer/shimmer.dart';
import 'package:http/http.dart' as http;

class DashboardPage extends StatefulWidget {
  const DashboardPage({Key? key}) : super(key: key);

  @override
  State<DashboardPage> createState() => _DashboardPageState();
}

class _DashboardPageState extends State<DashboardPage> {
  String? username;

  @override
  void initState() {
    super.initState();
    fetchUsername();
  }

  Future<void> fetchUsername() async {
    // Simulate network delay for loading effect
    await Future.delayed(const Duration(milliseconds: 1500));
    try {
      final response =
      await http.get(Uri.parse('http://10.156.194.228:5000/getUsername'));

      if (mounted) {
        if (response.statusCode == 200) {
          setState(() {
            username = jsonDecode(response.body)['username'];
          });
        } else {
          setState(() => username = "Ayush Sharma");
          print("Failed to fetch username");
        }
      }
    } catch (e) {
      if (mounted) {
        setState(() => username = "User");
      }
      print("Error fetching username: $e");
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF4F6F8),
      body: RefreshIndicator(
        onRefresh: fetchUsername,
        color: const Color(0xFF0D47A1),
        child: CustomScrollView(
          slivers: [
            _buildSliverAppBar(),
            SliverToBoxAdapter(
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 16.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const SizedBox(height: 20),
                    _buildHeader(),
                    const SizedBox(height: 30),
                    _buildQuickActions(),
                    const SizedBox(height: 30),
                  ],
                ),
              ),
            ),
            _buildSectionSliver("My Recent Symptoms", const RecentSymptomsCard()),
            _buildSectionSliver("AI Insights", const AIInsightCard()),
            _buildHistorySectionSliver(),
            const SliverToBoxAdapter(child: SizedBox(height: 40)),
          ],
        ),
      ),
    );
  }

  // --- WIDGET BUILDER METHODS ---

  SliverAppBar _buildSliverAppBar() {
    return SliverAppBar(
      floating: true,
      pinned: true,
      snap: false,
      elevation: 0.5,
      shadowColor: Colors.grey[200],
      backgroundColor: const Color(0xFFF4F6F8),
      surfaceTintColor: const Color(0xFFF4F6F8),
      title: const Text(
        "ᴹᴱᴰᴵCONNECT",
        style: TextStyle(
          color: Colors.black87,
          fontWeight: FontWeight.bold,
          fontSize: 22,
        ),
      ),
      centerTitle: false,
      actions: [
        IconButton(
          onPressed: () {},
          icon: Icon(Icons.notifications_none_rounded, color: Colors.grey[700]),
        ),
        Padding(
          padding: const EdgeInsets.only(right: 16.0),
          child: CircleAvatar(
            backgroundColor: Colors.blue[100],
            child: const Text("A", style: TextStyle(fontWeight: FontWeight.bold, color: Color(0xFF0D47A1))),
          ),
        ),
      ],
    );
  }

  Widget _buildHeader() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          "Welcome back,",
          style: TextStyle(fontSize: 20, color: Colors.black54),
        ),
        const SizedBox(height: 4),
        if (username == null)
          Shimmer.fromColors(
            baseColor: Colors.grey[300]!,
            highlightColor: Colors.grey[100]!,
            child: Container(
              height: 42,
              width: 220,
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(12),
              ),
            ),
          )
        else
          Text(
            username!,
            style: const TextStyle(
              fontSize: 38,
              fontWeight: FontWeight.bold,
              color: Colors.black87,
              height: 1.2,
            ),
          ),
      ],
    );
  }

  Widget _buildQuickActions() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _buildSectionTitle("Quick Actions"),
        GridView.count(
          crossAxisCount: 4,
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          crossAxisSpacing: 12,
          mainAxisSpacing: 12,
          children: [
            _buildActionCard(Icons.add_circle_outline_rounded, "Add Record", () {}),
            _buildActionCard(Icons.medical_services_outlined, "Find Doctor", () {}),
            _buildActionCard(Icons.receipt_long_outlined, "Prescriptions", () {}),
            _buildActionCard(Icons.pending_actions_outlined, "Reminders", () {}),
          ],
        ),
      ],
    );
  }

  Widget _buildActionCard(IconData icon, String label, VoidCallback onTap) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(16),
          boxShadow: [
            BoxShadow(
              color: Colors.grey.withOpacity(0.1),
              spreadRadius: 1,
              blurRadius: 10,
            ),
          ],
        ),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(icon, size: 30, color: const Color(0xFF0D47A1)),
            const SizedBox(height: 8),
            Text(
              label,
              textAlign: TextAlign.center,
              style: const TextStyle(fontSize: 12, color: Colors.black54),
            ),
          ],
        ),
      ),
    );
  }

  SliverToBoxAdapter _buildSectionSliver(String title, Widget child) {
    return SliverToBoxAdapter(
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const SizedBox(height: 10),
            _buildSectionTitle(title),
            child,
            const SizedBox(height: 20),
          ],
        ),
      ),
    );
  }

  SliverToBoxAdapter _buildHistorySectionSliver() {
    return SliverToBoxAdapter(
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 16.0),
        child: Column(
          children: [
            const SizedBox(height: 10),
            _buildSectionHeaderWithAction("History", () {
              Navigator.push(context, MaterialPageRoute(builder: (_) => const HistoryPage()));
            }),
            const HistoryCard(
                id: "0001",
                doctor: "Dr. John Smith",
                date: "Jan 15, 2025",
                symptoms: "Fever, fatigue",
                diagnosis: "Flu",
                prescription: "Paracetamol, rest"),
            const SizedBox(height: 12),
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

  Widget _buildSectionTitle(String title) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 16.0),
      child: Text(
        title,
        style: const TextStyle(
          fontSize: 20,
          fontWeight: FontWeight.w600,
          color: Colors.black87,
        ),
      ),
    );
  }

  Widget _buildSectionHeaderWithAction(String title, VoidCallback onViewAll) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 16.0),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            title,
            style: const TextStyle(
              fontSize: 20,
              fontWeight: FontWeight.w600,
              color: Colors.black87,
            ),
          ),
          TextButton(
            onPressed: onViewAll,
            child: const Text(
              "See All",
              style: TextStyle(
                color: Color(0xFF42A5F5),
                fontWeight: FontWeight.bold,
                fontSize: 14,
              ),
            ),
          ),
        ],
      ),
    );
  }
}

