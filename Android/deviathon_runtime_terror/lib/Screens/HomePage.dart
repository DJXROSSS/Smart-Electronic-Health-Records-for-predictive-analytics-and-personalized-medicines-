import 'package:deviathon_runtime_terror/Screens/symptom_chat_page.dart';
import 'package:deviathon_runtime_terror/components/profile_page.dart';
import 'package:flutter/material.dart';
import 'dashboard_page.dart';
import 'history_page.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  int _selectedIndex = 0;

  // This list holds the pages that the bottom navigation bar will switch between.
  // ProfilePage() is called without any arguments because it now fetches its own data.
  final List<Widget> _pages = const [
    DashboardPage(),
    HistoryPage(),
    ProfilePage(),
  ];

  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey[100],
      // The body displays the currently selected page from the _pages list.
      body: _pages[_selectedIndex],

      // This button is always visible for starting a new diagnosis.
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () {
          Navigator.push(
            context,
            MaterialPageRoute(builder: (_) => const SymptomChatPage()),
          );
        },
        backgroundColor: Colors.blueAccent,
        icon: const Icon(Icons.add_circle_outline),
        label: const Text("New Diagnosis"),
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.centerFloat,

      // This is the bottom navigation bar.
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _selectedIndex,
        selectedItemColor: Colors.blueAccent,
        unselectedItemColor: Colors.grey,
        onTap: _onItemTapped,
        items: const [
          BottomNavigationBarItem(
            icon: Icon(Icons.dashboard_outlined),
            activeIcon: Icon(Icons.dashboard),
            label: 'Dashboard',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.history_outlined),
            activeIcon: Icon(Icons.history),
            label: 'History',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.person_outline),
            activeIcon: Icon(Icons.person),
            label: 'Profile',
          ),
        ],
      ),
    );
  }
}