import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';

export default function About() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerText}>About the Application</Text>
      </View>

      {/* Application Description */}
      <View style={styles.descriptionContainer}>
        <Text style={styles.sectionTitle}>Background</Text>
        <Text style={styles.sectionText}>
          Agricultural productivity and food security are heavily dependent on the health of crops and livestock. 
          Farmers, especially in remote or resource-limited areas, often face challenges in diagnosing and reporting 
          diseases that affect their livestock and crops. Early diagnosis and timely reporting are crucial for effective 
          disease management and prevention of widespread outbreaks.
        </Text>

        <Text style={styles.sectionTitle}>Purpose</Text>
        <Text style={styles.sectionText}>
          This mobile application is a revolutionary tool powered by Artificial Intelligence (AI) for disease diagnosis and reporting. 
          It enables farmers to use their smartphones to access diagnostic tools, report symptoms, and receive actionable advice. 
          By integrating AI with existing platforms, the application can analyze submitted data (images and descriptions of disease signs) 
          to provide accurate diagnoses and suggest appropriate treatments or interventions.
        </Text>

        <Text style={styles.sectionTitle}>Expected Outcomes</Text>
        <Text style={styles.sectionText}>
          - **Enhanced Disease Diagnosis**: AI-powered tools provide accurate and prompt identification of crop and livestock diseases.
          {"\n"}- **Timely Reporting and Intervention**: Farmers can quickly report symptoms and receive actionable advice.
          {"\n"}- **Increased Access to Expert Knowledge**: Real-time suggestions and alerts are sent to farmers and veterinarians.
          {"\n"}- **Improved Farm Productivity**: Early intervention reduces losses and increases overall productivity.
          {"\n"}- **Data Collection and Analysis**: Continuous data helps monitor trends and potential outbreaks.
          {"\n"}- **Cost-Effective Disease Management**: Reduces the need for costly interventions through timely preventive measures.
          {"\n"}- **Empowerment and Education of Farmers**: Empowers farmers with knowledge and tools to manage diseases effectively.
          {"\n"}- **Community Engagement and Support**: Encourages a collaborative approach to disease management.
          {"\n"}- **Sustainable Agriculture Practices**: Promotes long-term, sustainable practices for crop and livestock management.
        </Text>

        <Text style={styles.sectionTitle}>Integration with Existing Systems</Text>
        <Text style={styles.sectionText}>
          The AI-based software will integrate with existing National Digital Livestock Mission (NDLM) systems to streamline 
          disease reporting and management. It will allow farmers to submit images and descriptions of disease signs and symptoms, 
          enabling the AI to generate suspected disease/condition reports, suggest preventive measures, and alert veterinarians 
          for appropriate action.
        </Text>

        <Text style={styles.sectionTitle}>Community Engagement and Support</Text>
        <Text style={styles.sectionText}>
          The platform will foster a sense of community and support among farmers by providing a space for shared learning and 
          communication. Farmers can access a wealth of resources, share experiences, and receive support from peers and experts.
        </Text>
      </View>

      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Icon name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  descriptionContainer: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
    color: '#4CAF50',
  },
  sectionText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 30,
    width: 50, // Adjust width as necessary
    alignSelf: 'flex-start',
  },
});

