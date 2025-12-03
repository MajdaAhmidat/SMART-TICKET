import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScreenWrapper from '../../components/ScreenWrapper';
import { colors } from '../../theme/colors';

const eventsData = [
  {
    id: '1',
    title: 'Concert Jazz Night',
    date: '20 Janvier 2025',
    location: 'Salle Pleyel, Paris',
    status: 'active',
    sold: 450,
    total: 500,
    revenue: '6,750 €',
  },
  {
    id: '2',
    title: 'Match de Football',
    date: '25 Janvier 2025',
    location: 'Stade Municipal',
    status: 'active',
    sold: 1200,
    total: 2000,
    revenue: '12,000 €',
  },
  {
    id: '3',
    title: 'Spectacle Comédie',
    date: '15 Février 2025',
    location: 'Théâtre National',
    status: 'draft',
    sold: 0,
    total: 300,
    revenue: '0 €',
  },
  {
    id: '4',
    title: 'Festival Électro',
    date: '10 Décembre 2024',
    location: 'Parc des Expositions',
    status: 'completed',
    sold: 5000,
    total: 5000,
    revenue: '75,000 €',
  },
];

const getStatusConfig = (status) => {
  switch (status) {
    case 'active':
      return { label: 'En cours', color: colors.success, icon: 'checkmark-circle' };
    case 'draft':
      return { label: 'Brouillon', color: colors.warning, icon: 'create' };
    case 'completed':
      return { label: 'Terminé', color: colors.textMuted, icon: 'checkmark-done' };
    default:
      return { label: 'Inconnu', color: colors.textMuted, icon: 'help' };
  }
};

const EventCard = ({ event, onPress }) => {
  const statusConfig = getStatusConfig(event.status);
  const fillPercentage = (event.sold / event.total) * 100;

  return (
    <TouchableOpacity style={styles.eventCard} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.eventHeader}>
        <View style={[styles.statusBadge, { backgroundColor: statusConfig.color + '20' }]}>
          <Ionicons name={statusConfig.icon} size={12} color={statusConfig.color} />
          <Text style={[styles.statusText, { color: statusConfig.color }]}>{statusConfig.label}</Text>
        </View>
        <TouchableOpacity style={styles.moreButton}>
          <Ionicons name="ellipsis-horizontal" size={20} color={colors.textMuted} />
        </TouchableOpacity>
      </View>
      
      <Text style={styles.eventTitle}>{event.title}</Text>
      
      <View style={styles.eventInfo}>
        <View style={styles.infoRow}>
          <Ionicons name="calendar-outline" size={14} color={colors.textSecondary} />
          <Text style={styles.infoText}>{event.date}</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="location-outline" size={14} color={colors.textSecondary} />
          <Text style={styles.infoText}>{event.location}</Text>
        </View>
      </View>

      <View style={styles.progressSection}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressLabel}>Remplissage</Text>
          <Text style={styles.progressValue}>{event.sold}/{event.total}</Text>
        </View>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${fillPercentage}%` }]} />
        </View>
      </View>

      <View style={styles.eventFooter}>
        <View style={styles.revenueInfo}>
          <Text style={styles.revenueLabel}>Revenus</Text>
          <Text style={styles.revenueValue}>{event.revenue}</Text>
        </View>
        <TouchableOpacity style={styles.editButton}>
          <Ionicons name="create-outline" size={18} color={colors.primary} />
          <Text style={styles.editText}>Modifier</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const MesEvenementsScreen = ({ navigation }) => {
  return (
    <ScreenWrapper>
      <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>Mes Événements</Text>
            <Text style={styles.headerSubtitle}>{eventsData.length} événements</Text>
          </View>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => navigation.navigate('CreerEvenement')}
          >
            <Ionicons name="add" size={24} color={colors.textPrimary} />
          </TouchableOpacity>
        </View>

        {/* Filter Tabs */}
        <View style={styles.filterTabs}>
          <TouchableOpacity style={[styles.filterTab, styles.filterTabActive]}>
            <Text style={[styles.filterTabText, styles.filterTabTextActive]}>Tous</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterTab}>
            <Text style={styles.filterTabText}>En cours</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterTab}>
            <Text style={styles.filterTabText}>Brouillons</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterTab}>
            <Text style={styles.filterTabText}>Terminés</Text>
          </TouchableOpacity>
        </View>

        {/* Events List */}
        <View style={styles.eventsList}>
          {eventsData.map((event) => (
            <EventCard 
              key={event.id} 
              event={event} 
              onPress={() => navigation.navigate('DetailsEvenement', { event })}
            />
          ))}
        </View>

        {/* Placeholder */}
        <View style={styles.placeholder}>
          <Ionicons name="calendar-outline" size={40} color={colors.textMuted} />
          <Text style={styles.placeholderTitle}>Liste des événements</Text>
          <Text style={styles.placeholderText}>+ bouton modifier</Text>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  addButton: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterTabs: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  filterTab: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: colors.backgroundSecondary,
  },
  filterTabActive: {
    backgroundColor: colors.primary,
  },
  filterTabText: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.textMuted,
  },
  filterTabTextActive: {
    color: colors.textPrimary,
  },
  eventsList: {
    marginBottom: 24,
  },
  eventCard: {
    backgroundColor: colors.card,
    borderRadius: 18,
    padding: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    marginLeft: 4,
    fontSize: 12,
    fontWeight: '600',
  },
  moreButton: {
    padding: 4,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 12,
  },
  eventInfo: {
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  infoText: {
    marginLeft: 8,
    fontSize: 13,
    color: colors.textSecondary,
  },
  progressSection: {
    marginBottom: 16,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  progressValue: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  eventFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  revenueInfo: {},
  revenueLabel: {
    fontSize: 12,
    color: colors.textMuted,
  },
  revenueValue: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.success,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary + '20',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
  },
  editText: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: '500',
    color: colors.primary,
  },
  placeholder: {
    alignItems: 'center',
    padding: 32,
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    borderStyle: 'dashed',
  },
  placeholderTitle: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  placeholderText: {
    marginTop: 4,
    fontSize: 14,
    color: colors.textMuted,
  },
});

export default MesEvenementsScreen;





