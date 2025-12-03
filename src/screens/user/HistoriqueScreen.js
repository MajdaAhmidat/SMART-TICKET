import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScreenWrapper from '../../components/ScreenWrapper';
import { colors } from '../../theme/colors';

const reservationsData = [
  {
    id: '1',
    title: 'Match PSG vs Lyon',
    date: '10 Décembre 2024',
    status: 'completed',
    price: '85 €',
    type: 'matchs',
  },
  {
    id: '2',
    title: 'Concert Ed Sheeran',
    date: '25 Novembre 2024',
    status: 'completed',
    price: '120 €',
    type: 'cinema',
  },
  {
    id: '3',
    title: 'Hôtel Le Méridien',
    date: '15 Novembre 2024',
    status: 'cancelled',
    price: '250 €',
    type: 'hotels',
  },
  {
    id: '4',
    title: 'Restaurant Le Comptoir',
    date: '8 Novembre 2024',
    status: 'completed',
    price: '75 €',
    type: 'restaurants',
  },
];

const getStatusConfig = (status) => {
  switch (status) {
    case 'completed':
      return { label: 'Terminée', color: colors.success, icon: 'checkmark-circle' };
    case 'cancelled':
      return { label: 'Annulée', color: colors.error, icon: 'close-circle' };
    case 'pending':
      return { label: 'En attente', color: colors.warning, icon: 'time' };
    default:
      return { label: 'Inconnu', color: colors.textMuted, icon: 'help-circle' };
  }
};

const getTypeIcon = (type) => {
  switch (type) {
    case 'matchs': return 'football-outline';
    case 'cinema': return 'film-outline';
    case 'transport': return 'car-outline';
    case 'hotels': return 'bed-outline';
    case 'restaurants': return 'restaurant-outline';
    case 'clubs': return 'musical-notes-outline';
    default: return 'calendar-outline';
  }
};

const ReservationCard = ({ item }) => {
  const statusConfig = getStatusConfig(item.status);
  
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.7}>
      <View style={styles.cardLeft}>
        <View style={styles.iconContainer}>
          <Ionicons name={getTypeIcon(item.type)} size={24} color={colors.primary} />
        </View>
      </View>
      <View style={styles.cardCenter}>
        <Text style={styles.cardTitle} numberOfLines={1}>{item.title}</Text>
        <View style={styles.cardInfo}>
          <Ionicons name="calendar-outline" size={14} color={colors.textMuted} />
          <Text style={styles.cardDate}>{item.date}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: statusConfig.color + '20' }]}>
          <Ionicons name={statusConfig.icon} size={12} color={statusConfig.color} />
          <Text style={[styles.statusText, { color: statusConfig.color }]}>{statusConfig.label}</Text>
        </View>
      </View>
      <View style={styles.cardRight}>
        <Text style={styles.price}>{item.price}</Text>
        <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
      </View>
    </TouchableOpacity>
  );
};

const HistoriqueScreen = () => {
  return (
    <ScreenWrapper>
      <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Historique</Text>
          <Text style={styles.headerSubtitle}>Liste des réservations passées</Text>
        </View>

        {/* Filter Tabs */}
        <View style={styles.filterTabs}>
          <TouchableOpacity style={[styles.filterTab, styles.filterTabActive]}>
            <Text style={[styles.filterTabText, styles.filterTabTextActive]}>Toutes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterTab}>
            <Text style={styles.filterTabText}>Terminées</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterTab}>
            <Text style={styles.filterTabText}>Annulées</Text>
          </TouchableOpacity>
        </View>

        {/* Stats Summary */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>4</Text>
            <Text style={styles.statLabel}>Réservations</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>530 €</Text>
            <Text style={styles.statLabel}>Total dépensé</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>75%</Text>
            <Text style={styles.statLabel}>Complétées</Text>
          </View>
        </View>

        {/* Reservations List */}
        <View style={styles.listContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Vos réservations</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>Filtrer</Text>
            </TouchableOpacity>
          </View>
          {reservationsData.map((item) => (
            <ReservationCard key={item.id} item={item} />
          ))}
        </View>

        {/* Empty State Placeholder */}
        <View style={styles.emptyPlaceholder}>
          <Ionicons name="document-text-outline" size={40} color={colors.textMuted} />
          <Text style={styles.emptyText}>Plus de réservations à afficher</Text>
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
  filterTabs: {
    flexDirection: 'row',
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
  },
  filterTab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  filterTabActive: {
    backgroundColor: colors.primary,
  },
  filterTabText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textMuted,
  },
  filterTabTextActive: {
    color: colors.textPrimary,
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: colors.border,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  statDivider: {
    width: 1,
    backgroundColor: colors.border,
    marginVertical: 4,
  },
  listContainer: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  seeAll: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardLeft: {
    marginRight: 14,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: colors.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardCenter: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  cardInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardDate: {
    marginLeft: 6,
    fontSize: 13,
    color: colors.textMuted,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    marginLeft: 4,
    fontSize: 11,
    fontWeight: '600',
  },
  cardRight: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  emptyPlaceholder: {
    alignItems: 'center',
    padding: 32,
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    borderStyle: 'dashed',
  },
  emptyText: {
    marginTop: 12,
    fontSize: 14,
    color: colors.textMuted,
  },
});

export default HistoriqueScreen;





