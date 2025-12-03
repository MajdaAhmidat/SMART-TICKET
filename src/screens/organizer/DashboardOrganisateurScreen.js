import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScreenWrapper from '../../components/ScreenWrapper';
import { colors } from '../../theme/colors';

const statsData = [
  { id: '1', label: 'Ventes totales', value: '12,540 €', icon: 'cash-outline', color: colors.success, change: '+15%' },
  { id: '2', label: 'Réservations', value: '324', icon: 'ticket-outline', color: colors.primary, change: '+8%' },
  { id: '3', label: 'Événements actifs', value: '12', icon: 'calendar-outline', color: colors.accent, change: '+2' },
  { id: '4', label: 'Taux de remplissage', value: '78%', icon: 'pie-chart-outline', color: colors.secondary, change: '+5%' },
];

const recentActivity = [
  { id: '1', title: 'Nouvelle réservation', desc: 'Match PSG vs Lyon', time: 'Il y a 5 min', type: 'booking' },
  { id: '2', title: 'Événement complet', desc: 'Concert Jazz Night', time: 'Il y a 1h', type: 'success' },
  { id: '3', title: 'Paiement reçu', desc: '150 € - Spectacle théâtre', time: 'Il y a 2h', type: 'payment' },
];

const DashboardOrganisateurScreen = ({ navigation }) => {
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
            <Text style={styles.greeting}>Bonjour, Organisateur 👋</Text>
            <Text style={styles.headerTitle}>Dashboard</Text>
          </View>
          <TouchableOpacity style={styles.notifButton}>
            <Ionicons name="notifications-outline" size={24} color={colors.textPrimary} />
            <View style={styles.notifBadge} />
          </TouchableOpacity>
        </View>

        {/* Revenue Card */}
        <View style={styles.revenueCard}>
          <View style={styles.revenueHeader}>
            <Text style={styles.revenueLabel}>Revenus ce mois</Text>
            <View style={styles.revenueBadge}>
              <Ionicons name="trending-up" size={14} color={colors.success} />
              <Text style={styles.revenueChange}>+23%</Text>
            </View>
          </View>
          <Text style={styles.revenueValue}>8,450 €</Text>
          <View style={styles.revenueChart}>
            {/* Placeholder chart bars */}
            {[40, 65, 45, 80, 55, 90, 70].map((height, index) => (
              <View 
                key={index} 
                style={[styles.chartBar, { height: height, opacity: index === 6 ? 1 : 0.5 }]} 
              />
            ))}
          </View>
          <View style={styles.chartLabels}>
            {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map((day, index) => (
              <Text key={index} style={styles.chartLabel}>{day}</Text>
            ))}
          </View>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          {statsData.map((stat) => (
            <View key={stat.id} style={[styles.statCard, { borderColor: stat.color + '40' }]}>
              <View style={[styles.statIcon, { backgroundColor: stat.color + '20' }]}>
                <Ionicons name={stat.icon} size={22} color={stat.color} />
              </View>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
              <View style={[styles.changeBadge, { backgroundColor: colors.success + '20' }]}>
                <Text style={styles.changeText}>{stat.change}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Actions rapides</Text>
          <View style={styles.actionsRow}>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => navigation.navigate('CreerEvenement')}
            >
              <Ionicons name="add-circle" size={28} color={colors.primary} />
              <Text style={styles.actionText}>Créer</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => navigation.navigate('MesEvenements')}
            >
              <Ionicons name="calendar" size={28} color={colors.secondary} />
              <Text style={styles.actionText}>Événements</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => navigation.navigate('Revenus')}
            >
              <Ionicons name="wallet" size={28} color={colors.accent} />
              <Text style={styles.actionText}>Revenus</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="stats-chart" size={28} color={colors.success} />
              <Text style={styles.actionText}>Rapports</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Activité récente</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>Voir tout</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.activityList}>
            {recentActivity.map((activity) => (
              <View key={activity.id} style={styles.activityItem}>
                <View style={[styles.activityDot, { 
                  backgroundColor: activity.type === 'success' ? colors.success : 
                                   activity.type === 'payment' ? colors.accentLight : colors.primary 
                }]} />
                <View style={styles.activityContent}>
                  <Text style={styles.activityTitle}>{activity.title}</Text>
                  <Text style={styles.activityDesc}>{activity.desc}</Text>
                </View>
                <Text style={styles.activityTime}>{activity.time}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Placeholder */}
        <View style={styles.placeholder}>
          <Ionicons name="construct-outline" size={32} color={colors.textMuted} />
          <Text style={styles.placeholderText}>
            Statistiques de vente + résumé des performances
          </Text>
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
  greeting: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  notifButton: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: colors.backgroundSecondary,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  notifBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.error,
  },
  revenueCard: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
  },
  revenueHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  revenueLabel: {
    fontSize: 14,
    color: colors.textPrimary + 'CC',
  },
  revenueBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.success + '30',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  revenueChange: {
    marginLeft: 4,
    fontSize: 12,
    fontWeight: '600',
    color: colors.success,
  },
  revenueValue: {
    fontSize: 36,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 20,
  },
  revenueChart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 100,
    marginBottom: 8,
  },
  chartBar: {
    width: 32,
    backgroundColor: colors.textPrimary,
    borderRadius: 6,
  },
  chartLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  chartLabel: {
    fontSize: 11,
    color: colors.textPrimary + '80',
    width: 32,
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    width: '48%',
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
  },
  statIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  changeBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  changeText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.success,
  },
  section: {
    marginBottom: 24,
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
    marginBottom: 16,
  },
  seeAll: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    width: '23%',
    borderWidth: 1,
    borderColor: colors.border,
  },
  actionText: {
    marginTop: 8,
    fontSize: 11,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  activityList: {
    backgroundColor: colors.card,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  activityDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 14,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  activityDesc: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  activityTime: {
    fontSize: 12,
    color: colors.textMuted,
  },
  placeholder: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    borderStyle: 'dashed',
  },
  placeholderText: {
    marginTop: 12,
    fontSize: 14,
    color: colors.textMuted,
    textAlign: 'center',
  },
});

export default DashboardOrganisateurScreen;





