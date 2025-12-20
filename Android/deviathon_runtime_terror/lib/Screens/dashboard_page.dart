// import 'package:deviathon_runtime_terror/Screens/history_page.dart';
// import 'package:deviathon_runtime_terror/components/ai_insight_card.dart';
// import 'package:deviathon_runtime_terror/components/history_card.dart';
// import 'package:deviathon_runtime_terror/components/recent_symptoms_card.dart';
// import 'package:flutter/material.dart';
// import 'dart:convert';
// import 'package:http/http.dart' as http;
// import 'package:shimmer/shimmer.dart';

// class DashboardPage extends StatefulWidget {
//   const DashboardPage({super.key});

//   @override
//   State<DashboardPage> createState() => _DashboardPageState();
// }

// class _DashboardPageState extends State<DashboardPage> {
//   String? username;

//   @override
//   void initState() {
//     super.initState();
//     fetchUsername();
//   }

//   Future<void> fetchUsername() async {
//     // Simulate network delay for loading effect
//     await Future.delayed(const Duration(milliseconds: 1500));
//     try {
//       final response =
//       await http.get(Uri.parse('http://10.156.194.228:5000/getUsername'));

//       if (mounted) {
//         if (response.statusCode == 200) {
//           setState(() {
//             username = jsonDecode(response.body)['username'];
//           });
//         } else {
//           setState(() => username = "Ayush Sharma");
//           print("Failed to fetch username");
//         }
//       }
//     } catch (e) {
//       if (mounted) {
//         setState(() => username = "User");
//       }
//       print("Error fetching username: $e");
//     }
//   }

//   @override
//   Widget build(BuildContext context) {
//     return Scaffold(
//       backgroundColor: const Color(0xFFF4F6F8),
//       body: RefreshIndicator(
//         onRefresh: fetchUsername,
//         color: const Color(0xFF0D47A1),
//         child: CustomScrollView(
//           slivers: [
//             _buildSliverAppBar(),
//             SliverToBoxAdapter(
//               child: Padding(
//                 padding: const EdgeInsets.symmetric(horizontal: 16.0),
//                 child: Column(
//                   crossAxisAlignment: CrossAxisAlignment.start,
//                   children: [
//                     const SizedBox(height: 20),
//                     _buildHeader(),
//                     const SizedBox(height: 30),
//                     _buildQuickActions(),
//                     const SizedBox(height: 30),
//                   ],
//                 ),
//               ),
//             ),
//             _buildSectionSliver("My Recent Symptoms", const RecentSymptomsCard()),
//             _buildSectionSliver("AI Insights", const AIInsightCard()),
//             _buildHistorySectionSliver(),
//             const SliverToBoxAdapter(child: SizedBox(height: 40)),
//           ],
//         ),
//       ),
//     );
//   }

//   // --- WIDGET BUILDER METHODS ---

//   SliverAppBar _buildSliverAppBar() {
//     return SliverAppBar(
//       floating: true,
//       pinned: true,
//       snap: false,
//       elevation: 0.5,
//       shadowColor: Colors.grey[200],
//       backgroundColor: const Color(0xFFF4F6F8),
//       surfaceTintColor: const Color(0xFFF4F6F8),
//       title: const Text(
//         "ᴹᴱᴰᴵCONNECT",
//         style: TextStyle(
//           color: Colors.black87,
//           fontWeight: FontWeight.bold,
//           fontSize: 22,
//         ),
//       ),
//       centerTitle: false,
//       actions: [
//         IconButton(
//           onPressed: () {},
//           icon: Icon(Icons.notifications_none_rounded, color: Colors.grey[700]),
//         ),
//         Padding(
//           padding: const EdgeInsets.only(right: 16.0),
//           child: CircleAvatar(
//             backgroundColor: Colors.blue[100],
//             child: const Text("A", style: TextStyle(fontWeight: FontWeight.bold, color: Color(0xFF0D47A1))),
//           ),
//         ),
//       ],
//     );
//   }

//   Widget _buildHeader() {
//     return Column(
//       crossAxisAlignment: CrossAxisAlignment.start,
//       children: [
//         const Text(
//           "Welcome back,",
//           style: TextStyle(fontSize: 20, color: Colors.black54),
//         ),
//         const SizedBox(height: 4),
//         if (username == null)
//           Shimmer.fromColors(
//             baseColor: Colors.grey[300]!,
//             highlightColor: Colors.grey[100]!,
//             child: Container(
//               height: 42,
//               width: 220,
//               decoration: BoxDecoration(
//                 color: Colors.white,
//                 borderRadius: BorderRadius.circular(12),
//               ),
//             ),
//           )
//         else
//           Text(
//             username!,
//             style: const TextStyle(
//               fontSize: 38,
//               fontWeight: FontWeight.bold,
//               color: Colors.black87,
//               height: 1.2,
//             ),
//           ),
//       ],
//     );
//   }

//   Widget _buildQuickActions() {
//     return Column(
//       crossAxisAlignment: CrossAxisAlignment.start,
//       children: [
//         _buildSectionTitle("Quick Actions"),
//         GridView.count(
//           crossAxisCount: 4,
//           shrinkWrap: true,
//           physics: const NeverScrollableScrollPhysics(),
//           crossAxisSpacing: 12,
//           mainAxisSpacing: 12,
//           children: [
//             _buildActionCard(Icons.add_circle_outline_rounded, "Add Record", () {}),
//             _buildActionCard(Icons.medical_services_outlined, "Find Doctor", () {}),
//             _buildActionCard(Icons.receipt_long_outlined, "Prescriptions", () {}),
//             _buildActionCard(Icons.pending_actions_outlined, "Reminders", () {}),
//           ],
//         ),
//       ],
//     );
//   }

//   Widget _buildActionCard(IconData icon, String label, VoidCallback onTap) {
//     return GestureDetector(
//       onTap: onTap,
//       child: Container(
//         decoration: BoxDecoration(
//           color: Colors.white,
//           borderRadius: BorderRadius.circular(16),
//           boxShadow: [
//             BoxShadow(
//               color: Colors.grey.withOpacity(0.1),
//               spreadRadius: 1,
//               blurRadius: 10,
//             ),
//           ],
//         ),
//         child: Column(
//           mainAxisAlignment: MainAxisAlignment.center,
//           children: [
//             Icon(icon, size: 30, color: const Color(0xFF0D47A1)),
//             const SizedBox(height: 8),
//             Text(
//               label,
//               textAlign: TextAlign.center,
//               style: const TextStyle(fontSize: 12, color: Colors.black54),
//             ),
//           ],
//         ),
//       ),
//     );
//   }

//   SliverToBoxAdapter _buildSectionSliver(String title, Widget child) {
//     return SliverToBoxAdapter(
//       child: Padding(
//         padding: const EdgeInsets.symmetric(horizontal: 16.0),
//         child: Column(
//           crossAxisAlignment: CrossAxisAlignment.start,
//           children: [
//             const SizedBox(height: 10),
//             _buildSectionTitle(title),
//             child,
//             const SizedBox(height: 20),
//           ],
//         ),
//       ),
//     );
//   }

//   SliverToBoxAdapter _buildHistorySectionSliver() {
//     return SliverToBoxAdapter(
//       child: Padding(
//         padding: const EdgeInsets.symmetric(horizontal: 16.0),
//         child: Column(
//           children: [
//             const SizedBox(height: 10),
//             _buildSectionHeaderWithAction("History", () {
//               Navigator.push(context, MaterialPageRoute(builder: (_) => const HistoryPage()));
//             }),
//             const HistoryCard(
//                 id: "0001",
//                 doctor: "Dr. John Smith",
//                 date: "Jan 15, 2025",
//                 symptoms: "Fever, fatigue",
//                 diagnosis: "Flu",
//                 prescription: "Paracetamol, rest"),
//             const SizedBox(height: 12),
//             const HistoryCard(
//                 id: "0002",
//                 doctor: "Dr. Amelia Lee",
//                 date: "Dec 18, 2024",
//                 symptoms: "Cough",
//                 diagnosis: "Bronchitis",
//                 prescription: "Azithromycin, steam inhalation"),
//           ],
//         ),
//       ),
//     );
//   }

//   Widget _buildSectionTitle(String title) {
//     return Padding(
//       padding: const EdgeInsets.only(bottom: 16.0),
//       child: Text(
//         title,
//         style: const TextStyle(
//           fontSize: 20,
//           fontWeight: FontWeight.w600,
//           color: Colors.black87,
//         ),
//       ),
//     );
//   }

//   Widget _buildSectionHeaderWithAction(String title, VoidCallback onViewAll) {
//     return Padding(
//       padding: const EdgeInsets.only(bottom: 16.0),
//       child: Row(
//         mainAxisAlignment: MainAxisAlignment.spaceBetween,
//         children: [
//           Text(
//             title,
//             style: const TextStyle(
//               fontSize: 20,
//               fontWeight: FontWeight.w600,
//               color: Colors.black87,
//             ),
//           ),
//           TextButton(
//             onPressed: onViewAll,
//             child: const Text(
//               "See All",
//               style: TextStyle(
//                 color: Color(0xFF42A5F5),
//                 fontWeight: FontWeight.bold,
//                 fontSize: 14,
//               ),
//             ),
//           ),
//         ],
//       ),
//     );
//   }
// }

import 'package:deviathon_runtime_terror/Screens/history_page.dart';
import 'package:deviathon_runtime_terror/components/ai_insight_card.dart';
import 'package:deviathon_runtime_terror/components/history_card.dart';
import 'package:deviathon_runtime_terror/components/recent_symptoms_card.dart';
import 'package:flutter/material.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;

class DashboardPage extends StatefulWidget {
  const DashboardPage({Key? key}) : super(key: key);

  @override
  State<DashboardPage> createState() => _DashboardPageState();
}

class _DashboardPageState extends State<DashboardPage> with SingleTickerProviderStateMixin {
  String? username;
  late AnimationController _animationController;
  late Animation<double> _fadeAnimation;
  late Animation<Offset> _slideAnimation;

  @override
  void initState() {
    super.initState();
    _animationController = AnimationController(
      duration: const Duration(milliseconds: 800),
      vsync: this,
    );
    
    _fadeAnimation = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(parent: _animationController, curve: Curves.easeOut),
    );
    
    _slideAnimation = Tween<Offset>(
      begin: const Offset(0, 0.1),
      end: Offset.zero,
    ).animate(CurvedAnimation(parent: _animationController, curve: Curves.easeOut));
    
    _animationController.forward();
    fetchUsername();
  }

  @override
  void dispose() {
    _animationController.dispose();
    super.dispose();
  }

  Future<void> fetchUsername() async {
    await Future.delayed(const Duration(milliseconds: 1500));
    try {
      final response = await http.get(
        Uri.parse('http://10.156.194.228:5000/getUsername'),
      );

      if (mounted) {
        if (response.statusCode == 200) {
          setState(() {
            username = jsonDecode(response.body)['username'];
          });
        } else {
          setState(() => username = "Jatin Kumar");
        }
      }
    } catch (e) {
      if (mounted) {
        setState(() => username = "Jatin");
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF8F9FA),
      body: RefreshIndicator(
        onRefresh: fetchUsername,
        color: const Color(0xFF4A90E2),
        child: CustomScrollView(
          physics: const BouncingScrollPhysics(),
          slivers: [
            _buildSliverAppBar(),
            SliverToBoxAdapter(
              child: FadeTransition(
                opacity: _fadeAnimation,
                child: SlideTransition(
                  position: _slideAnimation,
                  child: Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 20.0),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const SizedBox(height: 24),
                        _buildHeader(),
                        const SizedBox(height: 32),
                        _buildHealthScoreCard(),
                        const SizedBox(height: 32),
                        _buildQuickActions(),
                        const SizedBox(height: 32),
                      ],
                    ),
                  ),
                ),
              ),
            ),
            // _buildSectionSliver("Recent Symptoms", const RecentSymptomsCard()),
            _buildSectionSliver("AI Health Insights", const AIInsightCard()),
            // _buildHistorySectionSliver(),
            const SliverToBoxAdapter(child: SizedBox(height: 80)),
          ],
        ),
      ),
    );
  }

  SliverAppBar _buildSliverAppBar() {
    return SliverAppBar(
      floating: true,
      snap: true,
      elevation: 0,
      backgroundColor: const Color(0xFFF8F9FA),
      expandedHeight: 70,
      flexibleSpace: FlexibleSpaceBar(
        background: Container(
          decoration: BoxDecoration(
            gradient: LinearGradient(
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
              colors: [
                const Color(0xFFF8F9FA),
                Colors.white.withOpacity(0.9),
              ],
            ),
          ),
        ),
        titlePadding: const EdgeInsets.only(left: 20, bottom: 16),
        title: Row(
          children: [
            Container(
              padding: const EdgeInsets.all(8),
              decoration: BoxDecoration(
                color: const Color(0xFF4A90E2).withOpacity(0.1),
                borderRadius: BorderRadius.circular(12),
              ),
              child: const Icon(
                Icons.local_hospital_rounded,
                color: Color(0xFF4A90E2),
                size: 24,
              ),
            ),
            const SizedBox(width: 8),
            const Text(
              "MediConnect",
              style: TextStyle(
                color: Colors.black87,
                fontWeight: FontWeight.bold,
                fontSize: 16,
                letterSpacing: 1.2,
              ),
            ),
          ],
        ),
      ),
      actions: [
        Container(
          margin: const EdgeInsets.only(right: 12),
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(12),
            boxShadow: [
              BoxShadow(
                color: Colors.black.withOpacity(0.05),
                blurRadius: 8,
                offset: const Offset(0, 2),
              ),
            ],
          ),
          child: IconButton(
            onPressed: () {},
            icon: Stack(
              children: [
                const Icon(Icons.notifications_none_rounded, color: Colors.black87),
                Positioned(
                  right: 0,
                  top: 0,
                  child: Container(
                    width: 8,
                    height: 8,
                    decoration: const BoxDecoration(
                      color: Color(0xFFFF5252),
                      shape: BoxShape.circle,
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
        Padding(
          padding: const EdgeInsets.only(right: 20.0),
          child: CircleAvatar(
            radius: 20,
            backgroundColor: const Color(0xFF4A90E2),
            child: const Text(
              "A",
              style: TextStyle(
                fontWeight: FontWeight.bold,
                color: Colors.white,
                fontSize: 18,
              ),
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildHeader() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          "Welcome back,",
          style: TextStyle(
            fontSize: 16,
            color: Colors.grey[600],
            fontWeight: FontWeight.w500,
          ),
        ),
        const SizedBox(height: 8),
        if (username == null)
          _buildLoadingUsername()
        else
          Text(
            username!,
            style: const TextStyle(
              fontSize: 32,
              fontWeight: FontWeight.bold,
              color: Colors.black87,
              height: 1.2,
            ),
          ),
        const SizedBox(height: 8),
        Text(
          "How are you feeling today?",
          style: TextStyle(
            fontSize: 14,
            color: Colors.grey[500],
          ),
        ),
      ],
    );
  }

  Widget _buildLoadingUsername() {
    return Container(
      height: 38,
      width: 180,
      decoration: BoxDecoration(
        color: Colors.grey[300],
        borderRadius: BorderRadius.circular(8),
      ),
      child: Center(
        child: SizedBox(
          width: 18,
          height: 18,
          child: CircularProgressIndicator(
            strokeWidth: 2,
            valueColor: AlwaysStoppedAnimation<Color>(Colors.grey[500]!),
          ),
        ),
      ),
    );
  }

  Widget _buildHealthScoreCard() {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        gradient: const LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [Color(0xFF4A90E2), Color(0xFF357ABD)],
        ),
        borderRadius: BorderRadius.circular(20),
        boxShadow: [
          BoxShadow(
            color: const Color(0xFF4A90E2).withOpacity(0.3),
            blurRadius: 16,
            offset: const Offset(0, 8),
          ),
        ],
      ),
      child: Row(
        children: [
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  "Health Score",
                  style: TextStyle(
                    color: Colors.white.withOpacity(0.9),
                    fontSize: 14,
                    fontWeight: FontWeight.w500,
                  ),
                ),
                const SizedBox(height: 8),
                const Row(
                  crossAxisAlignment: CrossAxisAlignment.end,
                  children: [
                    Text(
                      "85",
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 36,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    Text(
                      "/100",
                      style: TextStyle(
                        color: Colors.white70,
                        fontSize: 18,
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 8),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                  decoration: BoxDecoration(
                    color: Colors.white.withOpacity(0.2),
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: const Text(
                    "Good",
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 12,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ),
              ],
            ),
          ),
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: Colors.white.withOpacity(0.15),
              shape: BoxShape.circle,
            ),
            child: const Icon(
              Icons.favorite_rounded,
              color: Colors.white,
              size: 40,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildQuickActions() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _buildSectionTitle("Quick Actions"),
        const SizedBox(height: 16),
        Row(
          children: [
            Expanded(
              child: _buildActionCard(
                Icons.add_circle_outline_rounded,
                "Add Record",
                const Color(0xFF4CAF50),
                () {},
              ),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: _buildActionCard(
                Icons.medical_services_outlined,
                "Find Doctor",
                const Color(0xFF2196F3),
                () {},
              ),
            ),
          ],
        ),
        const SizedBox(height: 12),
        Row(
          children: [
            Expanded(
              child: _buildActionCard(
                Icons.receipt_long_outlined,
                "Prescriptions",
                const Color(0xFFFF9800),
                () {},
              ),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: _buildActionCard(
                Icons.alarm_rounded,
                "Reminders",
                const Color(0xFF9C27B0),
                () {},
              ),
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildActionCard(IconData icon, String label, Color color, VoidCallback onTap) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.all(20),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(16),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.04),
              blurRadius: 12,
              offset: const Offset(0, 4),
            ),
          ],
        ),
        child: Column(
          children: [
            Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: color.withOpacity(0.1),
                borderRadius: BorderRadius.circular(12),
              ),
              child: Icon(icon, size: 28, color: color),
            ),
            const SizedBox(height: 12),
            Text(
              label,
              textAlign: TextAlign.center,
              style: const TextStyle(
                fontSize: 13,
                color: Colors.black87,
                fontWeight: FontWeight.w600,
              ),
            ),
          ],
        ),
      ),
    );
  }

  SliverToBoxAdapter _buildSectionSliver(String title, Widget child) {
    return SliverToBoxAdapter(
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 20.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _buildSectionTitle(title),
            const SizedBox(height: 16),
            child,
            const SizedBox(height: 24),
          ],
        ),
      ),
    );
  }

  SliverToBoxAdapter _buildHistorySectionSliver() {
    return SliverToBoxAdapter(
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 20.0),
        child: Column(
          children: [
            _buildSectionHeaderWithAction("Medical History", () {
              Navigator.push(
                context,
                MaterialPageRoute(builder: (_) => const HistoryPage()),
              );
            }),
            const SizedBox(height: 16),
            const HistoryCard(
              id: "0001",
              doctor: "Dr. John Smith",
              date: "Jan 15, 2025",
              symptoms: "Fever, fatigue",
              diagnosis: "Flu",
              prescription: "Paracetamol, rest",
            ),
            const SizedBox(height: 12),
            const HistoryCard(
              id: "0002",
              doctor: "Dr. Amelia Lee",
              date: "Dec 18, 2024",
              symptoms: "Cough",
              diagnosis: "Bronchitis",
              prescription: "Azithromycin, steam inhalation",
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildSectionTitle(String title) {
    return Text(
      title,
      style: const TextStyle(
        fontSize: 20,
        fontWeight: FontWeight.bold,
        color: Colors.black87,
        letterSpacing: 0.3,
      ),
    );
  }

  Widget _buildSectionHeaderWithAction(String title, VoidCallback onViewAll) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(
          title,
          style: const TextStyle(
            fontSize: 20,
            fontWeight: FontWeight.bold,
            color: Colors.black87,
            letterSpacing: 0.3,
          ),
        ),
        TextButton.icon(
          onPressed: onViewAll,
          icon: const Text(
            "See All",
            style: TextStyle(
              color: Color(0xFF4A90E2),
              fontWeight: FontWeight.w600,
              fontSize: 14,
            ),
          ),
          label: const Icon(
            Icons.arrow_forward_ios_rounded,
            size: 14,
            color: Color(0xFF4A90E2),
          ),
        ),
      ],
    );
  }
}