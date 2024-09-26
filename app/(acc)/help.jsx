import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';

export default function Help() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Help & Support</Text>
      </View>

      {/* FAQ Section */}
      <View style={styles.faqContainer}>
        <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>

        {/* FAQ Item 1 */}
        <View style={styles.faqItem}>
          <Icon name="question-answer" size={24} color="#4CAF50" />
          <View style={styles.faqContent}>
            <Text style={styles.faqQuestion}>How can I reset my password?</Text>
            <Text style={styles.faqAnswer}>
              To reset your password, go to the profile settings and select "Change Password."
            </Text>
          </View>
        </View>

        {/* FAQ Item 2 */}
        <View style={styles.faqItem}>
          <Icon name="question-answer" size={24} color="#4CAF50" />
          <View style={styles.faqContent}>
            <Text style={styles.faqQuestion}>Where can I view my order history?</Text>
            <Text style={styles.faqAnswer}>
              You can view your order history in the "My Orders" section under the main menu.
            </Text>
          </View>
        </View>

        {/* FAQ Item 3 */}
        <View style={styles.faqItem}>
          <Icon name="question-answer" size={24} color="#4CAF50" />
          <View style={styles.faqContent}>
            <Text style={styles.faqQuestion}>How can I contact support?</Text>
            <Text style={styles.faqAnswer}>
              You can reach out to our support team through the "Contact Us" button below.
            </Text>
          </View>
        </View>
      </View>

      {/* Contact Us Button */}
      <TouchableOpacity style={styles.contactButton} onPress={() => alert('Contacting Support...')}>
        <Icon name="phone" size={24} color="#fff" />
        <Text style={styles.contactButtonText}>Contact Support</Text>
      </TouchableOpacity>
      
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Icon name="arrow-back" size={24} color="#fff" />
        <Text style={styles.backButtonText}>Back</Text>
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  faqContainer: {
    marginBottom: 30,
  },
  faqItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  faqContent: {
    marginLeft: 20,
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  faqAnswer: {
    fontSize: 14,
    color: '#666',
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    justifyContent: 'center',
    borderRadius: 10,
    marginBottom: 30,
  },
  contactButtonText: {
    color: 'white',
    marginLeft: 10,
    fontSize: 16,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2196F3',
    paddingVertical: 15,
    justifyContent: 'center',
    borderRadius: 10,
  },
  backButtonText: {
    color: 'white',
    marginLeft: 10,
    fontSize: 16,
  },
});
