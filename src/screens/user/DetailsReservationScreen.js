import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScreenWrapper from '../../components/ScreenWrapper';
import { colors } from '../../theme/colors';
import { useAuth } from '../../context/AuthContext';

const DetailsReservationScreen = ({ route, navigation }) => {
  const { isUserLoggedIn, user } = useAuth();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  
  const item = route.params?.item || {
    title: 'Événement',
    date: '15 Janvier 2025',
    location: 'Paris',
    price: '100 €',
    rating: 4.5,
  };

  const handleReservation = () => {
    // Si l'utilisateur n'est pas connecté, rediriger vers la page de connexion
    if (!isUserLoggedIn) {
      navigation.navigate('Login', {
        returnTo: {
          screen: 'DetailsReservation',
          params: { item },
        },
      });
      return;
    }
    
    // Si connecté, afficher la modal de confirmation
    setShowConfirmModal(true);
  };

  const confirmReservation = () => {
    setShowConfirmModal(false);
    Alert.alert(
      'Réservation confirmée ! 🎉',
      `Votre réservation pour "${item.title}" a été enregistrée. Vous recevrez une confirmation par email.`,
      [
        {
          text: 'Voir mes réservations',
          onPress: () => navigation.navigate('Historique'),
        },
        {
          text: 'OK',
          style: 'cancel',
        },
      ]
    );
  };

  return (
    <ScreenWrapper>
      <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header with Back Button */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.favoriteButton}>
            <Ionicons name="heart-outline" size={24} color={colors.accent} />
          </TouchableOpacity>
        </View>

        {/* Image Placeholder */}
        <View style={styles.imageContainer}>
          <Ionicons name="image-outline" size={80} color={colors.textMuted} />
          <Text style={styles.imagePlaceholder}>Image de l'événement</Text>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>{item.title}</Text>
            <View style={styles.ratingBadge}>
              <Ionicons name="star" size={16} color={colors.accentLight} />
              <Text style={styles.ratingText}>{item.rating}</Text>
            </View>
          </View>

          {/* Info Cards */}
          <View style={styles.infoCards}>
            <View style={styles.infoCard}>
              <Ionicons name="calendar" size={24} color={colors.primary} />
              <Text style={styles.infoLabel}>Date</Text>
              <Text style={styles.infoValue}>{item.date}</Text>
            </View>
            <View style={styles.infoCard}>
              <Ionicons name="location" size={24} color={colors.secondary} />
              <Text style={styles.infoLabel}>Lieu</Text>
              <Text style={styles.infoValue}>{item.location}</Text>
            </View>
            <View style={styles.infoCard}>
              <Ionicons name="pricetag" size={24} color={colors.accent} />
              <Text style={styles.infoLabel}>Prix</Text>
              <Text style={styles.infoValue}>{item.price}</Text>
            </View>
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
              nostrud exercitation ullamco laboris.
            </Text>
          </View>

          {/* Features */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Inclus</Text>
            <View style={styles.features}>
              <View style={styles.featureItem}>
                <Ionicons name="checkmark-circle" size={20} color={colors.success} />
                <Text style={styles.featureText}>Accès VIP</Text>
              </View>
              <View style={styles.featureItem}>
                <Ionicons name="checkmark-circle" size={20} color={colors.success} />
                <Text style={styles.featureText}>Parking gratuit</Text>
              </View>
              <View style={styles.featureItem}>
                <Ionicons name="checkmark-circle" size={20} color={colors.success} />
                <Text style={styles.featureText}>Assurance annulation</Text>
              </View>
            </View>
          </View>

          {/* Login Notice (if not logged in) */}
          {!isUserLoggedIn && (
            <View style={styles.loginNotice}>
              <Ionicons name="information-circle-outline" size={22} color={colors.info} />
              <Text style={styles.loginNoticeText}>
                Vous devez être connecté pour effectuer une réservation
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Bottom Action Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Prix total</Text>
          <Text style={styles.priceValue}>{item.price}</Text>
        </View>
        <TouchableOpacity 
          style={styles.reserveButton}
          onPress={handleReservation}
        >
          <Text style={styles.reserveButtonText}>
            {isUserLoggedIn ? 'Réserver maintenant' : 'Se connecter pour réserver'}
          </Text>
          <Ionicons 
            name={isUserLoggedIn ? 'arrow-forward' : 'log-in-outline'} 
            size={20} 
            color={colors.textPrimary} 
          />
        </TouchableOpacity>
      </View>

      {/* Confirmation Modal */}
      <Modal
        visible={showConfirmModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowConfirmModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalIcon}>
              <Ionicons name="ticket" size={48} color={colors.primary} />
            </View>
            <Text style={styles.modalTitle}>Confirmer la réservation</Text>
            <Text style={styles.modalSubtitle}>
              Vous êtes sur le point de réserver :
            </Text>
            
            <View style={styles.modalDetails}>
              <Text style={styles.modalEventTitle}>{item.title}</Text>
              <View style={styles.modalDetailRow}>
                <Ionicons name="calendar-outline" size={16} color={colors.textMuted} />
                <Text style={styles.modalDetailText}>{item.date}</Text>
              </View>
              <View style={styles.modalDetailRow}>
                <Ionicons name="location-outline" size={16} color={colors.textMuted} />
                <Text style={styles.modalDetailText}>{item.location}</Text>
              </View>
              <View style={styles.modalDetailRow}>
                <Ionicons name="person-outline" size={16} color={colors.textMuted} />
                <Text style={styles.modalDetailText}>{user?.email}</Text>
              </View>
            </View>

            <View style={styles.modalTotal}>
              <Text style={styles.modalTotalLabel}>Total à payer</Text>
              <Text style={styles.modalTotalValue}>{item.price}</Text>
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={styles.modalCancelButton}
                onPress={() => setShowConfirmModal(false)}
              >
                <Text style={styles.modalCancelText}>Annuler</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.modalConfirmButton}
                onPress={confirmReservation}
              >
                <Text style={styles.modalConfirmText}>Confirmer</Text>
                <Ionicons name="checkmark" size={18} color={colors.textPrimary} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 120,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: colors.background + 'CC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: colors.background + 'CC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    height: 280,
    backgroundColor: colors.backgroundSecondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholder: {
    marginTop: 12,
    fontSize: 14,
    color: colors.textMuted,
  },
  content: {
    padding: 20,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  title: {
    flex: 1,
    fontSize: 24,
    fontWeight: '700',
    color: colors.textPrimary,
    marginRight: 12,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.accentLight + '20',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: '600',
    color: colors.accentLight,
  },
  infoCards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  infoCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: colors.border,
  },
  infoLabel: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 8,
  },
  infoValue: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textPrimary,
    marginTop: 4,
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 12,
  },
  description: {
    fontSize: 15,
    color: colors.textSecondary,
    lineHeight: 24,
  },
  features: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureText: {
    marginLeft: 12,
    fontSize: 15,
    color: colors.textPrimary,
  },
  loginNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.info + '15',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.info + '30',
  },
  loginNoticeText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 14,
    color: colors.info,
    lineHeight: 20,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.backgroundSecondary,
    padding: 20,
    paddingBottom: 34,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  priceContainer: {
    flex: 1,
  },
  priceLabel: {
    fontSize: 12,
    color: colors.textMuted,
  },
  priceValue: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  reserveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 12,
  },
  reserveButtonText: {
    color: colors.textPrimary,
    fontWeight: '600',
    fontSize: 16,
    marginRight: 8,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: colors.card,
    borderRadius: 24,
    padding: 24,
    width: '100%',
    maxWidth: 340,
    borderWidth: 1,
    borderColor: colors.border,
  },
  modalIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: 8,
  },
  modalSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 20,
  },
  modalDetails: {
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  modalEventTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 12,
  },
  modalDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  modalDetailText: {
    marginLeft: 10,
    fontSize: 14,
    color: colors.textSecondary,
  },
  modalTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.primary + '15',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.primary + '30',
  },
  modalTotalLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  modalTotalValue: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.primary,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  modalCancelButton: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  modalCancelText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  modalConfirmButton: {
    flex: 1,
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  modalConfirmText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.textPrimary,
  },
});

export default DetailsReservationScreen;
