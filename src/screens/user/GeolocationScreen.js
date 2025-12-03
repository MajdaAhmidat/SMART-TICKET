import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScreenWrapper from '../../components/ScreenWrapper';
import { colors, categoryColors } from '../../theme/colors';

// Événements avec localisation
const eventsWithLocation = [
  { 
    id: '1', 
    name: 'Match Raja vs Wydad', 
    type: 'matchs', 
    distance: '1.2 km', 
    icon: 'football-outline',
    address: 'Stade Mohammed V, Casablanca',
    lat: 33.5731,
    lng: -7.5898,
    date: '20 Jan 2025',
    price: '150 MAD'
  },
  { 
    id: '2', 
    name: 'Concert Saad Lamjarred', 
    type: 'cinema', 
    distance: '800 m', 
    icon: 'musical-notes-outline',
    address: 'OLM Souissi, Rabat',
    lat: 33.9716,
    lng: -6.8498,
    date: '25 Jan 2025',
    price: '300 MAD'
  },
  { 
    id: '3', 
    name: 'Film Marocain - Première', 
    type: 'cinema', 
    distance: '500 m', 
    icon: 'film-outline',
    address: 'Cinéma Megarama, Casablanca',
    lat: 33.5892,
    lng: -7.6114,
    date: '22 Jan 2025',
    price: '80 MAD'
  },
  { 
    id: '4', 
    name: 'Soirée Pacha Club', 
    type: 'clubs', 
    distance: '2.1 km', 
    icon: 'wine-outline',
    address: 'Pacha Club, Marrakech',
    lat: 31.6295,
    lng: -7.9811,
    date: '18 Jan 2025',
    price: '200 MAD'
  },
  { 
    id: '5', 
    name: 'Restaurant La Sqala', 
    type: 'restaurants', 
    distance: '350 m', 
    icon: 'restaurant-outline',
    address: 'Boulevard des Almohades, Casablanca',
    lat: 33.6037,
    lng: -7.6166,
    date: 'Ouvert',
    price: '250 MAD/pers'
  },
];

const categories = [
  { id: 'all', name: 'Tous', icon: 'apps-outline' },
  { id: 'matchs', name: 'Matchs', icon: 'football-outline', color: categoryColors.matchs },
  { id: 'cinema', name: 'Spectacles', icon: 'film-outline', color: categoryColors.cinema },
  { id: 'restaurants', name: 'Restos', icon: 'restaurant-outline', color: categoryColors.restaurants },
  { id: 'clubs', name: 'Clubs', icon: 'musical-notes-outline', color: categoryColors.clubs },
];

const GeolocationScreen = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('distance'); // distance or date

  const filteredEvents = selectedCategory === 'all' 
    ? eventsWithLocation 
    : eventsWithLocation.filter(e => e.type === selectedCategory);

  const sortedEvents = [...filteredEvents].sort((a, b) => {
    if (sortBy === 'distance') {
      return parseFloat(a.distance) - parseFloat(b.distance);
    }
    return 0;
  });

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
            <Text style={styles.headerTitle}>Près de vous 📍</Text>
            <Text style={styles.headerSubtitle}>Événements à proximité</Text>
          </View>
          <TouchableOpacity style={styles.mapButton}>
            <Ionicons name="map" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Location Status */}
        <View style={styles.locationStatus}>
          <Ionicons name="location" size={18} color={colors.success} />
          <Text style={styles.locationText}>Casablanca, Maroc</Text>
          <TouchableOpacity>
            <Text style={styles.changeText}>Changer</Text>
          </TouchableOpacity>
        </View>

        {/* Category Filter */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesScroll}
          contentContainerStyle={styles.categoriesContent}
        >
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={[
                styles.categoryChip,
                selectedCategory === cat.id && styles.categoryChipActive
              ]}
              onPress={() => setSelectedCategory(cat.id)}
            >
              <Ionicons 
                name={cat.icon} 
                size={18} 
                color={selectedCategory === cat.id ? colors.textPrimary : colors.textMuted} 
              />
              <Text style={[
                styles.categoryChipText,
                selectedCategory === cat.id && styles.categoryChipTextActive
              ]}>
                {cat.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Sort Options */}
        <View style={styles.sortRow}>
          <Text style={styles.resultsCount}>{sortedEvents.length} événements</Text>
          <View style={styles.sortButtons}>
            <TouchableOpacity 
              style={[styles.sortButton, sortBy === 'distance' && styles.sortButtonActive]}
              onPress={() => setSortBy('distance')}
            >
              <Ionicons name="navigate" size={14} color={sortBy === 'distance' ? colors.primary : colors.textMuted} />
              <Text style={[styles.sortText, sortBy === 'distance' && styles.sortTextActive]}>Distance</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.sortButton, sortBy === 'date' && styles.sortButtonActive]}
              onPress={() => setSortBy('date')}
            >
              <Ionicons name="calendar" size={14} color={sortBy === 'date' ? colors.primary : colors.textMuted} />
              <Text style={[styles.sortText, sortBy === 'date' && styles.sortTextActive]}>Date</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Events List with Location */}
        <View style={styles.eventsList}>
          {sortedEvents.map((event) => (
            <TouchableOpacity 
              key={event.id} 
              style={styles.eventCard}
              onPress={() => navigation.navigate('DetailsReservation', { item: event })}
              activeOpacity={0.8}
            >
              {/* Event Image Placeholder */}
              <View style={styles.eventImage}>
                <Ionicons name={event.icon} size={32} color={colors.textMuted} />
              </View>

              <View style={styles.eventContent}>
                {/* Title & Distance */}
                <View style={styles.eventHeader}>
                  <Text style={styles.eventName} numberOfLines={1}>{event.name}</Text>
                  <View style={styles.distanceBadge}>
                    <Ionicons name="navigate" size={12} color={colors.secondary} />
                    <Text style={styles.distanceText}>{event.distance}</Text>
                  </View>
                </View>

                {/* Address with Map Icon */}
                <View style={styles.addressRow}>
                  <Ionicons name="location-outline" size={14} color={colors.textMuted} />
                  <Text style={styles.addressText} numberOfLines={1}>{event.address}</Text>
                </View>

                {/* Date & Price */}
                <View style={styles.eventFooter}>
                  <View style={styles.dateRow}>
                    <Ionicons name="calendar-outline" size={14} color={colors.textSecondary} />
                    <Text style={styles.dateText}>{event.date}</Text>
                  </View>
                  <Text style={styles.priceText}>{event.price}</Text>
                </View>

                {/* Action Buttons */}
                <View style={styles.actionButtons}>
                  <TouchableOpacity style={styles.directionsButton}>
                    <Ionicons name="navigate-circle" size={18} color={colors.secondary} />
                    <Text style={styles.directionsText}>Itinéraire</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.bookButton}>
                    <Text style={styles.bookText}>Réserver</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Map CTA */}
        <TouchableOpacity style={styles.mapCTA}>
          <Ionicons name="map-outline" size={24} color={colors.primary} />
          <View style={styles.mapCTAContent}>
            <Text style={styles.mapCTATitle}>Voir sur la carte</Text>
            <Text style={styles.mapCTASubtitle}>Visualisez tous les événements</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color={colors.textMuted} />
        </TouchableOpacity>
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
    marginBottom: 16,
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
  mapButton: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: colors.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.success + '15',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    marginBottom: 20,
  },
  locationText: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: colors.textPrimary,
    fontWeight: '500',
  },
  changeText: {
    fontSize: 13,
    color: colors.primary,
    fontWeight: '600',
  },
  categoriesScroll: {
    marginBottom: 16,
  },
  categoriesContent: {
    gap: 8,
    flexDirection: 'row',
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  categoryChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  categoryChipText: {
    marginLeft: 6,
    fontSize: 13,
    fontWeight: '500',
    color: colors.textMuted,
  },
  categoryChipTextActive: {
    color: colors.textPrimary,
  },
  sortRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  resultsCount: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  sortButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: colors.backgroundSecondary,
  },
  sortButtonActive: {
    backgroundColor: colors.primary + '20',
  },
  sortText: {
    marginLeft: 4,
    fontSize: 12,
    color: colors.textMuted,
  },
  sortTextActive: {
    color: colors.primary,
    fontWeight: '600',
  },
  eventsList: {
    marginBottom: 20,
  },
  eventCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    marginBottom: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  eventImage: {
    height: 120,
    backgroundColor: colors.backgroundSecondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventContent: {
    padding: 16,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  eventName: {
    flex: 1,
    fontSize: 17,
    fontWeight: '600',
    color: colors.textPrimary,
    marginRight: 8,
  },
  distanceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.secondary + '20',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  distanceText: {
    marginLeft: 4,
    fontSize: 12,
    fontWeight: '600',
    color: colors.secondary,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  addressText: {
    flex: 1,
    marginLeft: 6,
    fontSize: 13,
    color: colors.textMuted,
  },
  eventFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    marginLeft: 6,
    fontSize: 13,
    color: colors.textSecondary,
  },
  priceText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  directionsButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.secondary + '15',
    paddingVertical: 10,
    borderRadius: 10,
  },
  directionsText: {
    marginLeft: 6,
    fontSize: 13,
    fontWeight: '600',
    color: colors.secondary,
  },
  bookButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 10,
    borderRadius: 10,
  },
  bookText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  mapCTA: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  mapCTAContent: {
    flex: 1,
    marginLeft: 14,
  },
  mapCTATitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  mapCTASubtitle: {
    fontSize: 13,
    color: colors.textMuted,
    marginTop: 2,
  },
});

export default GeolocationScreen;
