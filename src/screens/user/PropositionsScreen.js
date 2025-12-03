import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScreenWrapper from '../../components/ScreenWrapper';
import { colors } from '../../theme/colors';

const propositionsData = [
  {
    id: '1',
    title: 'Match Real Madrid vs Barcelona',
    date: '15 Janvier 2025',
    location: 'Santiago Bernabéu',
    price: '150 €',
    rating: 4.9,
    image: null,
  },
  {
    id: '2',
    title: 'PSG vs Manchester City',
    date: '22 Janvier 2025',
    location: 'Parc des Princes',
    price: '120 €',
    rating: 4.7,
  },
  {
    id: '3',
    title: 'Bayern Munich vs Liverpool',
    date: '28 Janvier 2025',
    location: 'Allianz Arena',
    price: '130 €',
    rating: 4.8,
  },
  {
    id: '4',
    title: 'Juventus vs AC Milan',
    date: '5 Février 2025',
    location: 'Allianz Stadium',
    price: '95 €',
    rating: 4.6,
  },
];

const PropositionCard = ({ item, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
    <View style={styles.cardImageContainer}>
      <View style={styles.cardImagePlaceholder}>
        <Ionicons name="image-outline" size={40} color={colors.textMuted} />
      </View>
      <View style={styles.priceBadge}>
        <Text style={styles.priceText}>{item.price}</Text>
      </View>
    </View>
    <View style={styles.cardContent}>
      <Text style={styles.cardTitle} numberOfLines={2}>{item.title}</Text>
      <View style={styles.cardInfo}>
        <View style={styles.infoRow}>
          <Ionicons name="calendar-outline" size={14} color={colors.textSecondary} />
          <Text style={styles.infoText}>{item.date}</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="location-outline" size={14} color={colors.textSecondary} />
          <Text style={styles.infoText}>{item.location}</Text>
        </View>
      </View>
      <View style={styles.cardFooter}>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={14} color={colors.accentLight} />
          <Text style={styles.ratingText}>{item.rating}</Text>
        </View>
        <View style={styles.bookButton}>
          <Text style={styles.bookButtonText}>Voir détails</Text>
        </View>
      </View>
    </View>
  </TouchableOpacity>
);

const PropositionsScreen = ({ route, navigation }) => {
  const category = route.params?.category || { title: 'Propositions', color: colors.primary };

  return (
    <ScreenWrapper>
      <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>{category.title}</Text>
            <Text style={styles.headerSubtitle}>{propositionsData.length} propositions disponibles</Text>
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="options-outline" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Filter Tags */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.filterTags}
          contentContainerStyle={styles.filterTagsContent}
        >
          <View style={[styles.tag, styles.tagActive]}>
            <Text style={[styles.tagText, styles.tagTextActive]}>Tous</Text>
          </View>
          <View style={styles.tag}>
            <Text style={styles.tagText}>Populaires</Text>
          </View>
          <View style={styles.tag}>
            <Text style={styles.tagText}>Nouveaux</Text>
          </View>
          <View style={styles.tag}>
            <Text style={styles.tagText}>Prix ↑</Text>
          </View>
          <View style={styles.tag}>
            <Text style={styles.tagText}>Prix ↓</Text>
          </View>
        </ScrollView>

        {/* Propositions List */}
        <View style={styles.listContainer}>
          {propositionsData.map((item) => (
            <PropositionCard
              key={item.id}
              item={item}
              onPress={() => navigation.navigate('DetailsReservation', { item })}
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
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 10,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: colors.backgroundSecondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerCenter: {
    flex: 1,
    marginHorizontal: 16,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  headerSubtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: colors.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterTags: {
    marginBottom: 20,
  },
  filterTagsContent: {
    paddingHorizontal: 20,
    gap: 8,
    flexDirection: 'row',
  },
  tag: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.backgroundSecondary,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: 8,
  },
  tagActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  tagText: {
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  tagTextActive: {
    color: colors.textPrimary,
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardImageContainer: {
    height: 160,
    position: 'relative',
  },
  cardImagePlaceholder: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  priceBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  priceText: {
    color: colors.textPrimary,
    fontWeight: '700',
    fontSize: 14,
  },
  cardContent: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 12,
  },
  cardInfo: {
    marginBottom: 12,
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
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: '600',
    color: colors.accentLight,
  },
  bookButton: {
    backgroundColor: colors.primary + '20',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  bookButtonText: {
    color: colors.primary,
    fontWeight: '600',
    fontSize: 13,
  },
});

export default PropositionsScreen;





