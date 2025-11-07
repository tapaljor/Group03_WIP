const CONTEXT = `
Project Title: Online Electronics Marketplace (E-commerce)

Group Team Details: Group#: 3
Student ID: 101291009 - Student Name: Masomi, Sayed Elyas
Student ID: 101433930 - Student Name: Paljor, Tashi
Student ID: 101567190 - Student Name: Rajan, Prabhakaran

Project Idea or Definition:
Online Electronic E-commerce, a cross-platform marketplace where users can securely buy and sell electronic items through a secure payment system. The database is powered by Google’s firebase.
The platform aims to simplify new or second-hand electronics trading by providing secure authentication, posting, and buy.

Brief Description of the Project:
The app will be available on Android and iOS.
 Key features include:
User Authentication & Profiles
 Secure signup/login with Firebase Authentication, profile editing, and optional seller verification (e.g., ID or email verification).


Item Listing 
Sellers can list electronic items with photos, and descriptions.


Buy Now Option
Sellers can click “Buy” button for immediate purchase.


Search & Filter
Advanced search and filters by product category, and brand.

Payment & Transaction Records
Integration with payment gateways and secure transaction logs.





Tools and Technologies:


Area
Technology
Mobile Platform
React Native
Backend
NodeJs, ExpressJS, 
Database
FirebaseAuth, Firestore, Firebase Real Time
API/Libraries
Firebase Auth, Google Maps, YouTube API
Payment
Stripe
AI customer case
Open AI
Hosting & Storage
Firebase
Version Control
GitHub, Google Docs
Agile Framework
Jira (SCRU methodology)







Database Structures or Database Design:
Table/Collection
Purpose
Users
User credentials, profile, image
Item
Post, media, authorsID, category, location
Betting
Betting lineups
Categories
Categories, like phone, TV, rice cooker
Locations
Locations city, country
Messages
Buyer message to seller (optional)






Screens Design:
Login/Signup Screen
 Secure Firebase authentication and optional seller verification.


Home/Dashboard Screen
 Displays live and featured products, and category browsing.


Profile Screen
 View user profile, edit settings.

About
 General information about the app.

FAQ
Frequently Asked Questions, in static information, however, AI power customer cases are also available. 

Chat
AI powered customer care services. Any questions related to the app will be answered professionally.

Search & Category Screen
 Search items or filter by brand, and category


Transaction/Payment Screen
 Secure payment and transaction history.

Edit/Delete Item
Edit item, by the owner

Payment
 After clicking “Buy”, it will be redirected to secure payment system, Stripe. 





Work Plan Based on SCRUM (12 Sprints):
Sprint
Deliverables
1
Requirement gathering, scope definition, team roles
2
Set up project environment (React Native, Firebase, backend)
3
Database and backend design (Firestore schemas)
4
User authentication and profile management
8
Search and filtering by category, and brand
9
Payment gateway integration and transaction logging
10
UI/UX refinement and responsive design
11
Testing, debugging, and performance optimization




References:
Google Firebase Documentation: https://firebase.google.com/docs
React Native: https://reactnative.dev/
Google Maps: https://developers.google.com/maps
Jira.com: https://www.atlassian.com/
Online payment system: https://docs.stripe.com/
College: George Brown College, Casa Loma, Toronto, Ontario

Professors: Jenelle Chen (Web, Android), Pritesh Patel (iOS, React Native), 
Jigisha Patel (iOS), Chintan Patel (iOS), Peter (Android, Web)

File name: Group03_Electronics_Marketplace.docx

This document provides a clear overview of the project, including its features, development process, and work plan based on SCRUM methodology. Let me know if you'd like to add or modify any sections!
`;
export default CONTEXT.trim()
