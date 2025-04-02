import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, SafeAreaView, TouchableOpacity } from 'react-native';
import { Camera, CameraView, BarcodeScanningResult } from 'expo-camera';

export default function BarcodeScanner() {
  const [hasPermission, setHasPermission] = useState(false);
  const [scannedData, setScannedData] = useState<BarcodeScanningResult | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = (result: BarcodeScanningResult) => {
    if (!scannedData) {
      setScannedData(result);
    }
  };

  const resetScanner = () => setScannedData(null);

  if (!hasPermission) {
    return (
      <SafeAreaView style={styles.centered}>
        <Text style={styles.infoText}>Esperando permiso para la cámara...</Text>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      {!scannedData ? (
        <CameraView
          style={StyleSheet.absoluteFillObject}
          onBarcodeScanned={handleBarCodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ['ean13', 'qr', 'code128'],
          }}
        />
      ) : (
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>Código escaneado:</Text>
          <Text style={styles.resultText}>Valor: {scannedData.data}</Text>
          <Text style={styles.resultText}>Tipo: {scannedData.type}</Text>

          <TouchableOpacity style={styles.button} onPress={resetScanner}>
            <Text style={styles.buttonText}>Escanear otro</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoText: {
    color: '#fff',
    fontSize: 18,
    paddingHorizontal: 20,
    textAlign: 'center',
  },
  resultContainer: {
    flex: 1,
    backgroundColor: '#101010',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  resultTitle: {
    fontSize: 24,
    color: '#00ffcc',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  resultText: {
    fontSize: 18,
    color: '#ffffff',
    marginVertical: 5,
  },
  button: {
    marginTop: 30,
    backgroundColor: '#00ffcc',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  buttonText: {
    color: '#101010',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
