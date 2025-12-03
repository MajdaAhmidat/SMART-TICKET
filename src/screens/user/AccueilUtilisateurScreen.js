import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScreenWrapper from '../../components/ScreenWrapper';
import CategoryCard from '../../components/CategoryCard';
import ProfileMenu from '../../components/ProfileMenu';
import { colors, categoryColors } from '../../theme/colors';

const categories = [
  { id: 'matchs', title: 'Matchs', icon: 'football-outline', color: categoryColors.matchs, count: 12 },
  { id: 'cinema', title: 'Cinéma & Spectacles', icon: 'film-outline', color: categoryColors.cinema, count: 28 },
  { id: 'transport', title: 'Transport', icon: 'car-outline', color: categoryColors.transport, count: 45 },
  { id: 'hotels', title: 'Hôtels', icon: 'bed-outline', color: categoryColors.hotels, count: 156 },
  { id: 'restaurants', title: 'Restaurants', icon: 'restaurant-outline', color: categoryColors.restaurants, count: 89 },
  { id: 'clubs', title: 'Clubs & Loisirs', icon: 'musical-notes-outline', color: categoryColors.clubs, count: 34 },
];

const AccueilUtilisateurScreen = ({ navigation }) => {
  const handleCategoryPress = (category) => {
    navigation.navigate('Propositions', { category });
  };

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
            <Text style={styles.greeting}>Bonjour ! 👋</Text>
            <Text style={styles.headerTitle}>Découvrez nos espaces</Text>
          </View>
          {/* Profile Menu with Organizer Access */}
          <ProfileMenu />
        </View>

        {/* Search Bar Placeholder */}
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={20} color={colors.textMuted} />
          <Text style={styles.searchPlaceholder}>Rechercher un événement...</Text>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>364</Text>
            <Text style={styles.statLabel}>Événements</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>6</Text>
            <Text style={styles.statLabel}>Catégories</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>24h</Text>
            <Text style={styles.statLabel}>Support</Text>
          </View>
        </View>

        {/* Section Title */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Explorer par catégorie</Text>
          <Ionicons name="grid-outline" size={20} color={colors.primary} />
        </View>

        {/* Categories List */}
        <View style={styles.categoriesContainer}>
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              title={category.title}
              icon={category.icon}
              color={category.color}
              count={category.count}
              onPress={() => handleCategoryPress(category)}
            />
          ))}
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
    fontSize: 26,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchPlaceholder: {
    marginLeft: 12,
    fontSize: 15,
    color: colors.textMuted,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 28,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: colors.border,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
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
  categoriesContainer: {
    marginTop: 4,
  },
});

export default AccueilUtilisateurScreen;
