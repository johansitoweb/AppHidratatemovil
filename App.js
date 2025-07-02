import React, { useState, useEffect } from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Platform,
  Alert,
  TextInput,
} from 'react-native';

const healthTips = [
  { id: '1', title: 'Bebe Suficiente Agua', description: 'Mantente hidratado durante el día, especialmente en el clima cálido de RD. ¡El agua es vida!' },
  { id: '2', title: 'Consume Frutas Tropicales', description: 'Aprovecha las frutas frescas de la isla como mango, piña, lechosa y chinola. ¡Son deliciosas y nutritivas!' },
  { id: '3', title: 'Camina y Explora', description: 'Disfruta de los paisajes de la República Dominicana. Caminar por la playa o en parques es excelente para tu salud física y mental.' },
  { id: '4', title: 'Duerme Bien', description: 'Asegura 7-9 horas de sueño de calidad cada noche para recargar tu cuerpo y mente.' },
  { id: '5', title: 'Alimentación Balanceada', description: 'Incluye una variedad de vegetales, proteínas magras y granos enteros en tus comidas diarias.' },
  { id: '6', title: 'Medita y Relájate', description: 'Dedica unos minutos al día a la meditación o a actividades que te ayuden a reducir el estrés.' },
  { id: '7', title: 'Conéctate con la Naturaleza', description: 'Pasa tiempo al aire libre, ya sea en la montaña, el campo o la playa. ¡La naturaleza sana!' },
  { id: '8', title: 'Limita Azúcares y Procesados', description: 'Reduce el consumo de alimentos y bebidas con alto contenido de azúcar y procesados para una mejor salud.' },
  { id: '9', 'title': 'Establece Metas Realistas', description: 'Define objetivos de bienestar alcanzables y celebra tus pequeños logros.' },
  { id: '10', 'title': 'Mantén Activa tu Mente', description: 'Aprende algo nuevo, lee un libro o resuelve acertijos para mantener tu cerebro en forma.' },
];

export default function App() {
  const [activeScreen, setActiveScreen] = useState('login');
  const [waterIntake, setWaterIntake] = useState(0);
  const glassSize = 250;
  const [currentMood, setCurrentMood] = useState(null);
  const moods = [
    { emoji: '😊', label: 'Feliz' },
    { emoji: '😐', label: 'Neutral' },
    { emoji: '😔', label: 'Triste' },
    { emoji: '😡', label: 'Enojado' },
    { emoji: '😴', label: 'Cansado' },
    { emoji: '🤩', label: 'Emocionado' },
  ];

  const [userProfile, setUserProfile] = useState({
    name: 'Juan Perez',
    email: 'juan.perez@example.com',
    age: '30',
    password: 'password123',
  });

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [tempProfile, setTempProfile] = useState({ ...userProfile });

  // --- Estados para Registro de Sueño ---
  const [sleepStartTime, setSleepStartTime] = useState(''); // Ej: "22:00"
  const [sleepEndTime, setSleepEndTime] = useState('');     // Ej: "06:30"
  const [sleepQuality, setSleepQuality] = useState(null);
  const sleepQualities = [
    { emoji: '😴', label: 'Malo' },
    { emoji: '😐', label: 'Regular' },
    { emoji: '😊', label: 'Bueno' },
    { emoji: '🤩', label: 'Excelente' },
  ];
  // Historial de sueño (simulado)
  const [sleepHistory, setSleepHistory] = useState([]);

  // --- Estados para Registro de Comidas ---
  const [mealType, setMealType] = useState(''); // Desayuno, Almuerzo, Cena, Snack
  const [mealDescription, setMealDescription] = useState('');
  const [mealHistory, setMealHistory] = useState([]);

  // --- Estados para Gráficos y Estadísticas (datos simulados/acumulados) ---
  const [dailyWaterIntakeHistory, setDailyWaterIntakeHistory] = useState([
    { day: 'Lun', value: 5 }, { day: 'Mar', value: 7 }, { day: 'Mié', value: 6 },
    { day: 'Jue', value: 8 }, { day: 'Vie', value: 4 }, { day: 'Sáb', value: 9 }, { day: 'Dom', value: 7 },
  ]);
  const [dailyMoodHistory, setDailyMoodHistory] = useState([
    { day: 'Lun', mood: '😊' }, { day: 'Mar', mood: '😐' }, { day: 'Mié', mood: '😔' },
    { day: 'Jue', mood: '🤩' }, { day: 'Vie', mood: '😊' }, { day: 'Sáb', mood: '😴' }, { day: 'Dom', mood: '😐' },
  ]);

  // Actualizar historial de agua al resetear (ejemplo simplificado)
  useEffect(() => {
    // En una app real, aquí guardarías el 'waterIntake' del día anterior
    // y lo añadirías a 'dailyWaterIntakeHistory'.
    // Por simplicidad, los datos de historial son fijos para este ejemplo.
  }, [waterIntake]);


  const handleLogin = () => {
    if (loginEmail === userProfile.email && loginPassword === userProfile.password) {
      setIsLoggedIn(true);
      setActiveScreen('home');
      Alert.alert('¡Bienvenido!', `Hola, ${userProfile.name}`);
    } else {
      Alert.alert('Error de Login', 'Email o contraseña incorrectos.');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveScreen('login');
    setLoginEmail('');
    setLoginPassword('');
    Alert.alert('Sesión Cerrada', 'Has cerrado tu sesión.');
  };

  const saveProfileChanges = () => {
    setUserProfile({ ...tempProfile });
    Alert.alert('Perfil Actualizado', 'Tus datos han sido guardados.');
    setActiveScreen('profile');
  };

  const addWater = (amount) => {
    setWaterIntake(prev => prev + amount);
  };
  const resetWater = () => {
    setWaterIntake(0);
    Alert.alert('Hidratación', '¡Tu contador de agua ha sido reiniciado!');
  };

  const selectMood = (mood) => {
    setCurrentMood(mood);
    Alert.alert('Ánimo Registrado', `Hoy te sientes: ${mood.label}`);
    // En una app real, podrías añadir el ánimo a dailyMoodHistory
  };

  // --- Funciones de Sueño ---
  const calculateSleepDuration = () => {
    if (!sleepStartTime || !sleepEndTime) return null;

    const [startH, startM] = sleepStartTime.split(':').map(Number);
    const [endH, endM] = sleepEndTime.split(':').map(Number);

    let startDate = new Date();
    startDate.setHours(startH, startM, 0, 0);

    let endDate = new Date();
    endDate.setHours(endH, endM, 0, 0);

    // Si la hora de fin es anterior a la de inicio, asume que terminó al día siguiente
    if (endDate < startDate) {
      endDate.setDate(endDate.getDate() + 1);
    }

    const diffMs = endDate - startDate;
    const diffHours = diffMs / (1000 * 60 * 60);
    const hours = Math.floor(diffHours);
    const minutes = Math.round((diffHours - hours) * 60);

    return { hours, minutes };
  };

  const registerSleep = () => {
    const duration = calculateSleepDuration();
    if (duration && sleepQuality) {
      const newSleepEntry = {
        date: new Date().toLocaleDateString('es-DO'),
        start: sleepStartTime,
        end: sleepEndTime,
        duration: `${duration.hours}h ${duration.minutes}m`,
        quality: sleepQuality.label,
        qualityEmoji: sleepQuality.emoji,
      };
      setSleepHistory(prev => [newSleepEntry, ...prev].slice(0, 7)); // Guarda los últimos 7 registros
      Alert.alert('Sueño Registrado', `Dormiste ${newSleepEntry.duration} con calidad ${newSleepEntry.quality}.`);
      setSleepStartTime('');
      setSleepEndTime('');
      setSleepQuality(null);
    } else {
      Alert.alert('Error', 'Por favor, ingresa la hora de inicio, fin y selecciona la calidad del sueño.');
    }
  };

  // --- Funciones de Comida ---
  const registerMeal = () => {
    if (mealType && mealDescription) {
      const newMealEntry = {
        id: Date.now().toString(),
        date: new Date().toLocaleDateString('es-DO'),
        time: new Date().toLocaleTimeString('es-DO', { hour: '2-digit', minute: '2-digit' }),
        type: mealType,
        description: mealDescription,
      };
      setMealHistory(prev => [newMealEntry, ...prev].slice(0, 10)); // Guarda los últimos 10 registros
      Alert.alert('Comida Registrada', `Registro de ${mealType}: ${mealDescription}`);
      setMealType('');
      setMealDescription('');
    } else {
      Alert.alert('Error', 'Por favor, ingresa el tipo y la descripción de la comida.');
    }
  };

  const renderScreen = () => {
    if (!isLoggedIn) {
      return (
        <View style={styles.loginContainer}>
          <Text style={styles.loginTitle}>¡Bienvenido!</Text>
          <Text style={styles.loginSubtitle}>Inicia sesión para continuar.</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#666"
            value={loginEmail}
            onChangeText={setLoginEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            placeholderTextColor="#666"
            secureTextEntry
            value={loginPassword}
            onChangeText={setLoginPassword}
          />
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
          </TouchableOpacity>
          <Text style={styles.loginHint}>Usa: Email '{userProfile.email}', Contraseña '{userProfile.password}'</Text>
        </View>
      );
    }

    switch (activeScreen) {
      case 'home':
        return (
          <ScrollView contentContainerStyle={styles.contentContainer}>
            <Text style={styles.homeTitle}>¡Bienvenido a Salud Dominicana!</Text>
            <Text style={styles.homeSubtitle}>Tu guía para un bienestar vibrante en la isla.</Text>
            <TouchableOpacity style={styles.homeCard} onPress={() => setActiveScreen('hydration')}>
              <Text style={styles.homeCardEmoji}>💧</Text>
              <Text style={styles.homeCardTitle}>Mi Hidratación</Text>
              <Text style={styles.homeCardDescription}>Registra tu consumo de agua diario.</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.homeCard} onPress={() => setActiveScreen('mood')}>
              <Text style={styles.homeCardEmoji}>😄</Text>
              <Text style={styles.homeCardTitle}>Mi Ánimo</Text>
              <Text style={styles.homeCardDescription}>Registra cómo te sientes cada día.</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.homeCard} onPress={() => setActiveScreen('sleep')}>
              <Text style={styles.homeCardEmoji}>😴</Text>
              <Text style={styles.homeCardTitle}>Mi Sueño</Text>
              <Text style={styles.homeCardDescription}>Registra tus horas y calidad de sueño.</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.homeCard} onPress={() => setActiveScreen('meals')}>
              <Text style={styles.homeCardEmoji}>🍽️</Text>
              <Text style={styles.homeCardTitle}>Mi Alimentación</Text>
              <Text style={styles.homeCardDescription}>Lleva un diario de tus comidas.</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.homeCard} onPress={() => setActiveScreen('progress')}>
              <Text style={styles.homeCardEmoji}>📈</Text>
              <Text style={styles.homeCardTitle}>Mi Progreso</Text>
              <Text style={styles.homeCardDescription}>Visualiza tus estadísticas de bienestar.</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.homeCard} onPress={() => setActiveScreen('tips')}>
              <Text style={styles.homeCardEmoji}>💡</Text>
              <Text style={styles.homeCardTitle}>Consejos de Bienestar</Text>
              <Text style={styles.homeCardDescription}>Descubre tips para una vida saludable.</Text>
            </TouchableOpacity>
          </ScrollView>
        );

      case 'hydration':
        return (
          <View style={styles.hydrationContainer}>
            <Text style={styles.screenTitle}>Control de Hidratación 💧</Text>
            <Text style={styles.waterCountText}>{waterIntake} vasos</Text>
            <Text style={styles.waterMlText}>({(waterIntake * glassSize / 1000).toFixed(1)} Litros)</Text>
            <View style={styles.hydrationButtonsContainer}>
              <TouchableOpacity style={styles.hydrationButton} onPress={() => addWater(1)}>
                <Text style={styles.hydrationButtonText}>+1 Vaso</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.hydrationButton} onPress={() => addWater(2)}>
                <Text style={styles.hydrationButtonText}>+2 Vasos</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.resetButton} onPress={resetWater}>
              <Text style={styles.resetButtonText}>Reiniciar</Text>
            </TouchableOpacity>
          </View>
        );

      case 'mood':
        return (
          <View style={styles.moodContainer}>
            <Text style={styles.screenTitle}>¿Cómo te sientes hoy? 😄</Text>
            <View style={styles.moodGrid}>
              {moods.map((mood, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.moodOption,
                    currentMood && currentMood.emoji === mood.emoji && styles.moodOptionSelected,
                  ]}
                  onPress={() => selectMood(mood)}
                >
                  <Text style={styles.moodEmoji}>{mood.emoji}</Text>
                  <Text style={styles.moodLabel}>{mood.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
            {currentMood && (
              <Text style={styles.selectedMoodText}>Hoy te sientes: {currentMood.label} {currentMood.emoji}</Text>
            )}
          </View>
        );

      case 'sleep':
        const sleepDuration = calculateSleepDuration();
        return (
          <ScrollView contentContainerStyle={styles.sleepContainer}>
            <Text style={styles.screenTitle}>Registro de Sueño 😴</Text>
            <Text style={styles.sectionLabel}>Hora de dormir (HH:MM):</Text>
            <TextInput
              style={styles.input}
              placeholder="Ej: 22:30"
              placeholderTextColor="#666"
              value={sleepStartTime}
              onChangeText={setSleepStartTime}
              keyboardType="numbers-and-punctuation"
            />
            <Text style={styles.sectionLabel}>Hora de despertar (HH:MM):</Text>
            <TextInput
              style={styles.input}
              placeholder="Ej: 06:00"
              placeholderTextColor="#666"
              value={sleepEndTime}
              onChangeText={setSleepEndTime}
              keyboardType="numbers-and-punctuation"
            />
            {sleepDuration && (
              <Text style={styles.sleepDurationText}>
                Duración estimada: {sleepDuration.hours}h {sleepDuration.minutes}m
              </Text>
            )}

            <Text style={styles.sectionLabel}>Calidad del sueño:</Text>
            <View style={styles.moodGrid}>
              {sleepQualities.map((quality, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.moodOption, // Reutilizamos el estilo moodOption
                    sleepQuality && sleepQuality.label === quality.label && styles.moodOptionSelected,
                  ]}
                  onPress={() => setSleepQuality(quality)}
                >
                  <Text style={styles.moodEmoji}>{quality.emoji}</Text>
                  <Text style={styles.moodLabel}>{quality.label}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity style={styles.saveButton} onPress={registerSleep}>
              <Text style={styles.saveButtonText}>Registrar Sueño</Text>
            </TouchableOpacity>

            <Text style={styles.historyTitle}>Historial de Sueño</Text>
            {sleepHistory.length > 0 ? (
              <FlatList
                data={sleepHistory}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <View style={styles.historyItem}>
                    <Text style={styles.historyText}>Fecha: {item.date}</Text>
                    <Text style={styles.historyText}>De {item.start} a {item.end}</Text>
                    <Text style={styles.historyText}>Duración: {item.duration}</Text>
                    <Text style={styles.historyText}>Calidad: {item.quality} {item.qualityEmoji}</Text>
                  </View>
                )}
              />
            ) : (
              <Text style={styles.noHistoryText}>Aún no hay registros de sueño.</Text>
            )}
          </ScrollView>
        );

      case 'meals':
        return (
          <ScrollView contentContainerStyle={styles.mealsContainer}>
            <Text style={styles.screenTitle}>Registro de Comidas 🍽️</Text>
            <Text style={styles.sectionLabel}>Tipo de Comida:</Text>
            <TextInput
              style={styles.input}
              placeholder="Ej: Desayuno, Almuerzo, Cena, Snack"
              placeholderTextColor="#666"
              value={mealType}
              onChangeText={setMealType}
            />
            <Text style={styles.sectionLabel}>Descripción (¿Qué comiste?):</Text>
            <TextInput
              style={styles.inputMultiline}
              placeholder="Ej: Huevos revueltos, tostadas con aguacate y café"
              placeholderTextColor="#666"
              value={mealDescription}
              onChangeText={setMealDescription}
              multiline
              numberOfLines={4}
            />
            <TouchableOpacity style={styles.saveButton} onPress={registerMeal}>
              <Text style={styles.saveButtonText}>Registrar Comida</Text>
            </TouchableOpacity>

            <Text style={styles.historyTitle}>Diario de Comidas</Text>
            {mealHistory.length > 0 ? (
              <FlatList
                data={mealHistory}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <View style={styles.historyItem}>
                    <Text style={styles.historyTextBold}>{item.type} - {item.date} {item.time}</Text>
                    <Text style={styles.historyText}>{item.description}</Text>
                  </View>
                )}
              />
            ) : (
              <Text style={styles.noHistoryText}>Aún no has registrado comidas hoy.</Text>
            )}
          </ScrollView>
        );

      case 'progress':
        return (
          <ScrollView contentContainerStyle={styles.progressContainer}>
            <Text style={styles.screenTitle}>Mi Progreso 📈</Text>

            <Text style={styles.chartTitle}>Consumo de Agua (Vasos/Día)</Text>
            <View style={styles.chart}>
              {dailyWaterIntakeHistory.map((data, index) => (
                <View key={index} style={styles.barContainer}>
                  <View style={[styles.bar, { height: data.value * 10 }]} />
                  <Text style={styles.barValue}>{data.value}</Text>
                  <Text style={styles.barLabel}>{data.day}</Text>
                </View>
              ))}
            </View>
            <Text style={styles.chartDescription}>Representación básica del consumo de agua en vasos por día.</Text>

            <Text style={[styles.chartTitle, {marginTop: 30}]}>Ánimo Diario</Text>
            <View style={styles.moodChart}>
                {dailyMoodHistory.map((data, index) => (
                    <View key={index} style={styles.moodChartItem}>
                        <Text style={styles.moodChartEmoji}>{data.mood}</Text>
                        <Text style={styles.moodChartLabel}>{data.day}</Text>
                    </View>
                ))}
            </View>
            <Text style={styles.chartDescription}>Cómo te has sentido a lo largo de la semana.</Text>

            {/* Aquí se podrían agregar más gráficos para sueño, comidas, etc. */}
             <Text style={[styles.chartTitle, {marginTop: 30}]}>Próximamente más gráficos...</Text>

          </ScrollView>
        );

      case 'tips':
        return (
          <FlatList
            data={healthTips}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.tipCard}>
                <Text style={styles.tipTitle}>{item.title}</Text>
                <Text style={styles.tipDescription}>{item.description}</Text>
              </View>
            )}
            contentContainerStyle={styles.tipsList}
            ListHeaderComponent={<Text style={styles.screenTitle}>Consejos de Bienestar 💡</Text>}
          />
        );

      case 'profile':
        return (
          <View style={styles.profileContainer}>
            <Text style={styles.screenTitle}>Mi Perfil 🧑</Text>
            <View style={styles.profileInfo}>
              <Text style={styles.profileLabel}>Nombre:</Text>
              <Text style={styles.profileValue}>{userProfile.name}</Text>
              <Text style={styles.profileLabel}>Email:</Text>
              <Text style={styles.profileValue}>{userProfile.email}</Text>
              <Text style={styles.profileLabel}>Edad:</Text>
              <Text style={styles.profileValue}>{userProfile.age}</Text>
            </View>
            <TouchableOpacity style={styles.editProfileButton} onPress={() => {
                setTempProfile({ ...userProfile });
                setActiveScreen('editProfile');
            }}>
              <Text style={styles.editProfileButtonText}>Modificar Datos</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
            </TouchableOpacity>
          </View>
        );

      case 'editProfile':
        return (
          <View style={styles.editProfileContainer}>
            <Text style={styles.screenTitle}>Editar Perfil ✍️</Text>
            <Text style={styles.editLabel}>Nombre:</Text>
            <TextInput
              style={styles.input}
              value={tempProfile.name}
              onChangeText={(text) => setTempProfile({ ...tempProfile, name: text })}
            />
            <Text style={styles.editLabel}>Email:</Text>
            <TextInput
              style={styles.input}
              value={tempProfile.email}
              onChangeText={(text) => setTempProfile({ ...tempProfile, email: text })}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Text style={styles.editLabel}>Edad:</Text>
            <TextInput
              style={styles.input}
              value={tempProfile.age}
              onChangeText={(text) => setTempProfile({ ...tempProfile, age: text })}
              keyboardType="numeric"
            />
            <TouchableOpacity style={styles.saveProfileButton} onPress={saveProfileChanges}>
              <Text style={styles.saveProfileButtonText}>Guardar Cambios</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelProfileButton} onPress={() => {
              setTempProfile({ ...userProfile });
              setActiveScreen('profile');
            }}>
              <Text style={styles.cancelProfileButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        );

      default:
        return <Text>Pantalla no encontrada</Text>;
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      {renderScreen()}

      {isLoggedIn && (
        <View style={styles.bottomNavBar}>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => setActiveScreen('home')}
          >
            <Text style={[styles.navIcon, activeScreen === 'home' && styles.navIconActive]}>🏠</Text>
            <Text style={[styles.navText, activeScreen === 'home' && styles.navTextActive]}>Inicio</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navButton}
            onPress={() => setActiveScreen('hydration')}
          >
            <Text style={[styles.navIcon, activeScreen === 'hydration' && styles.navIconActive]}>💧</Text>
            <Text style={[styles.navText, activeScreen === 'hydration' && styles.navTextActive]}>Agua</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navButton}
            onPress={() => setActiveScreen('mood')}
          >
            <Text style={[styles.navIcon, activeScreen === 'mood' && styles.navIconActive]}>😄</Text>
            <Text style={[styles.navText, activeScreen === 'mood' && styles.navTextActive]}>Ánimo</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navButton}
            onPress={() => setActiveScreen('sleep')}
          >
            <Text style={[styles.navIcon, activeScreen === 'sleep' && styles.navIconActive]}>😴</Text>
            <Text style={[styles.navText, activeScreen === 'sleep' && styles.navTextActive]}>Sueño</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navButton}
            onPress={() => setActiveScreen('meals')}
          >
            <Text style={[styles.navIcon, activeScreen === 'meals' && styles.navIconActive]}>🍽️</Text>
            <Text style={[styles.navText, activeScreen === 'meals' && styles.navTextActive]}>Comidas</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navButton}
            onPress={() => setActiveScreen('progress')}
          >
            <Text style={[styles.navIcon, activeScreen === 'progress' && styles.navIconActive]}>📈</Text>
            <Text style={[styles.navText, activeScreen === 'progress' && styles.navTextActive]}>Progreso</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navButton}
            onPress={() => setActiveScreen('tips')}
          >
            <Text style={[styles.navIcon, activeScreen === 'tips' && styles.navIconActive]}>💡</Text>
            <Text style={[styles.navText, activeScreen === 'tips' && styles.navTextActive]}>Consejos</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navButton}
            onPress={() => setActiveScreen('profile')}
          >
            <Text style={[styles.navIcon, activeScreen === 'profile' && styles.navIconActive]}>👤</Text>
            <Text style={[styles.navText, activeScreen === 'profile' && styles.navTextActive]}>Perfil</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#E8F5E9',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
  contentContainer: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
    paddingBottom: 80,
  },
  screenTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 20,
    textAlign: 'center',
  },

  homeTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginBottom: 10,
    textAlign: 'center',
  },
  homeSubtitle: {
    fontSize: 18,
    color: '#4CAF50',
    marginBottom: 40,
    textAlign: 'center',
    paddingHorizontal: 15,
  },
  homeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    width: '90%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 8,
  },
  homeCardEmoji: {
    fontSize: 40,
    marginBottom: 10,
  },
  homeCardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#388E3C',
    marginBottom: 5,
  },
  homeCardDescription: {
    fontSize: 14,
    color: '#66BB6A',
    textAlign: 'center',
  },

  hydrationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 80,
  },
  waterCountText: {
    fontSize: 80,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 5,
  },
  waterMlText: {
    fontSize: 20,
    color: '#1976D2',
    marginBottom: 30,
  },
  hydrationButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginBottom: 20,
  },
  hydrationButton: {
    backgroundColor: '#42A5F5',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  hydrationButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resetButton: {
    backgroundColor: '#EF5350',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  resetButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  moodContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 80,
  },
  moodGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 30,
  },
  moodOption: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    margin: 10,
    alignItems: 'center',
    width: '40%',
    aspectRatio: 1,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  moodOptionSelected: {
    borderColor: '#FFC107',
    backgroundColor: '#FFFDE7',
  },
  moodEmoji: {
    fontSize: 50,
    marginBottom: 5,
  },
  moodLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#424242',
  },
  selectedMoodText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#388E3C',
    marginTop: 20,
  },

  tipsList: {
    flexGrow: 1,
    paddingHorizontal: 15,
    paddingBottom: 80,
  },
  tipCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
  },
  tipTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#388E3C',
    marginBottom: 5,
  },
  tipDescription: {
    fontSize: 14,
    color: '#424242',
    lineHeight: 20,
  },

  bottomNavBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 15,
  },
  navButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
  },
  navIcon: {
    fontSize: 25,
    color: '#E8F5E9',
    marginBottom: 3,
  },
  navIconActive: {
    color: '#FFFFFF',
  },
  navText: {
    fontSize: 10, // Reducido para caber más opciones
    color: '#E8F5E9',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  navTextActive: {
    color: '#FFFFFF',
  },

  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#E8F5E9',
  },
  loginTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginBottom: 10,
  },
  loginSubtitle: {
    fontSize: 18,
    color: '#4CAF50',
    marginBottom: 40,
  },
  input: {
    width: '90%',
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  inputMultiline: { // Estilo para TextInput multilínea
    width: '90%',
    height: 100, // Mayor altura
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10, // Añadir padding vertical
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
    textAlignVertical: 'top', // Para que el texto empiece arriba
  },
  loginButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 8,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginHint: {
    marginTop: 20,
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },

  profileContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#E8F5E9',
    paddingBottom: 80,
  },
  profileInfo: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 25,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 8,
    marginBottom: 30,
  },
  profileLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  profileValue: {
    fontSize: 20,
    color: '#333',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    paddingBottom: 5,
  },
  editProfileButton: {
    backgroundColor: '#FFC107',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 8,
    marginBottom: 15,
  },
  editProfileButtonText: {
    color: '#333',
    fontSize: 18,
    fontWeight: 'bold',
  },

  logoutButton: {
    backgroundColor: '#dc3545',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 8,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },

  editProfileContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#E8F5E9',
    paddingBottom: 80,
  },
  editLabel: {
    fontSize: 18,
    color: '#333',
    marginBottom: 8,
    alignSelf: 'flex-start',
    marginLeft: '5%',
    fontWeight: 'bold',
  },
  saveProfileButton: {
    backgroundColor: '#28a745',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 8,
  },
  saveButtonText: { // Estilo compartido para botones de guardar
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cancelProfileButton: {
    backgroundColor: '#6c757d',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 15,
  },
  cancelProfileButtonText: {
    color: 'white',
    fontSize: 16,
  },

  // --- Estilos para Registro de Sueño ---
  sleepContainer: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
    paddingBottom: 80,
  },
  sectionLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    alignSelf: 'flex-start',
    marginLeft: '5%',
  },
  sleepDurationText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1976D2',
    marginTop: 10,
    marginBottom: 20,
  },
  historyTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginTop: 30,
    marginBottom: 15,
    alignSelf: 'center',
  },
  historyItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    width: '90%',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
  },
  historyText: {
    fontSize: 16,
    color: '#424242',
    marginBottom: 3,
  },
  historyTextBold: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  noHistoryText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 10,
  },

  // --- Estilos para Registro de Comidas ---
  mealsContainer: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
    paddingBottom: 80,
  },

  // --- Estilos para Gráficos y Estadísticas ---
  progressContainer: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
    paddingBottom: 80,
  },
  chartTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 15,
    marginTop: 10,
    textAlign: 'center',
  },
  chart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    width: '100%',
    height: 150, // Altura fija para el gráfico de barras
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
    marginBottom: 15,
  },
  barContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: '100%',
  },
  bar: {
    width: 25,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
  },
  barValue: {
    fontSize: 12,
    color: '#333',
    marginTop: 5,
  },
  barLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
    fontWeight: 'bold',
  },
  chartDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  moodChart: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingVertical: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
    marginBottom: 15,
  },
  moodChartItem: {
    alignItems: 'center',
  },
  moodChartEmoji: {
    fontSize: 30,
    marginBottom: 5,
  },
  moodChartLabel: {
    fontSize: 12,
    color: '#666',
    fontWeight: 'bold',
  }
});
