import 'package:deviathon_runtime_terror/Screens/LoginPage.dart';
import 'package:deviathon_runtime_terror/Screens/Signup.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class Starterpage extends StatefulWidget {
  const Starterpage({super.key});

  @override
  State<Starterpage> createState() => _StarterpageState();
}
bool _login = true;
Color accent = Colors.red;

class _StarterpageState extends State<Starterpage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: SingleChildScrollView(
          child: Container(
            width: MediaQuery.of(context).size.width,
            height: MediaQuery.of(context).size.height,
            decoration: BoxDecoration(
              gradient: LinearGradient(
                colors: [accent, Colors.white],
                begin: Alignment.topCenter,
                end: Alignment.bottomCenter,
              ),
            ),
            child: SafeArea(
              child: Padding(
                padding: const EdgeInsets.only(top: 30),
                child: Column(
                  // mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text(
                        "EHR Systems",
                        textAlign: TextAlign.center,
                        style: GoogleFonts.orbitron(
                          fontSize: 40,
                          color: Colors.white,
                        )
                    ),
                    SizedBox(height: 20,),
                    Text(
                      "TMKBPJ",
                      textAlign: TextAlign.center,
                      style: TextStyle(fontSize: 18, color: Colors.white),
                    ),
                    SizedBox(height: 40,),
                    Padding(
                      padding: const EdgeInsets.all(10.0),
                      child: Container(
                        width: MediaQuery.of(context).size.width * 0.85,
                        height: MediaQuery.of(context).size.height * 0.5,
                        decoration: BoxDecoration(
                            borderRadius: BorderRadius.circular(20),
                            color: Colors.white
                        ),
                        child: Column(
                          // mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                          children: [
                            SizedBox(height: 15,),
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                              children: [
                                OutlinedButton(
                                  style: ButtonStyle(
                                      backgroundColor: WidgetStateColor.resolveWith((states) => _login ? accent : Colors.transparent,)
                                  ),
                                  onPressed: () {
                                    setState(() {
                                      _login = true;
                                    });
                                    // Navigator.push(
                                    //   context,
                                    //   MaterialPageRoute(builder: (context) => LoginPage()),
                                    // );
                                  },
                                  child: Text("Login", style: TextStyle(color: _login ? Colors.white : Colors.black),),
                                ),
                                OutlinedButton(
                                  style: ButtonStyle(
                                      backgroundColor: WidgetStateColor.resolveWith((states) => _login ? Colors.transparent : accent,)
                                  ),
                                  onPressed: () {
                                    setState(() {
                                      _login = false;
                                    });
                                    // Navigator.push(
                                    //   context,
                                    //   MaterialPageRoute(builder: (context) => LoginPage()),
                                    // );
                                  },
                                  child: Text("SignUp", style: TextStyle(color: _login ? Colors.black : Colors.white),),
                                ),
                              ],
                            ),
                            SizedBox(height: 20,),
                            _login ? LoginPage() : SignUpPage(),
                          ],
                        ),
                      ),
                    )
                  ],
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
