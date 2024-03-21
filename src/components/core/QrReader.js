"use client";
import { useEffect, useRef, useState } from "react";
import QrScanner from "qr-scanner";
 
export default function QrReader({onSuccess, onData}) {
    // QR States
    const scanner = useRef();
    const videoEl = useRef(null);
    const qrBoxEl = useRef(null);
    const [qrOn, setQrOn] = useState(true);
  
    // Result
    const [scannedResult, setScannedResult] = useState("");
  
    // Success
    const onScanSuccess = (result) => {
      // 🖨 Print the "result" to browser console.

      // ✅ Handle success.
      // 😎 You can do whatever you want with the scanned result.
           // console.log(result?.data);
      setScannedResult(result?.data);
      onData(false);
      onSuccess(result?.data);

    };
  
    // Fail
    const onScanFail = (err) => {
      // 🖨 Print the "err" to browser console.
     // console.log(err);
    };
  
    useEffect(() => {
      if (videoEl?.current && !scanner.current) {
        // 👉 Instantiate the QR Scanner
        scanner.current = new QrScanner(videoEl?.current, onScanSuccess, {
          onDecodeError: onScanFail,
          // 📷 This is the camera facing mode. In mobile devices, "environment" means back camera and "user" means front camera.
          preferredCamera: "environment",
          // 🖼 This will help us position our "QrFrame.svg" so that user can only scan when qr code is put in between our QrFrame.svg.
          highlightScanRegion: true,
          // 🔥 This will produce a yellow (default color) outline around the qr code that we scan, showing a proof that our qr-scanner is scanning that qr code.
          highlightCodeOutline: true,
          // 📦 A custom div which will pair with "highlightScanRegion" option above 👆. This gives us full control over our scan region.
          overlay: qrBoxEl?.current || undefined,
        });
        // 🚀 Start QR Scanner
        scanner?.current?.start().then(() => setQrOn(true)).catch((err) => {if (err) setQrOn(false);});
      }
  
      // 🧹 Clean up on unmount.
      // 🚨 This removes the QR Scanner from rendering and using camera when it is closed or removed from the UI.
      return () => {
        if (!videoEl?.current) {scanner?.current?.stop();}
      };
    }, [scannedResult]);
  
    // ❌ If "camera" is not allowed in browser permissions, show an alert.
    useEffect(() => {
      if (!qrOn)
        alert("Camera is blocked or not accessible. Please allow camera in your browser permissions and Reload.");
    }, [qrOn]);
 
    return (
      <div className="qr-reader">
        <video ref={videoEl}></video>
        <section ref={qrBoxEl}>
        <img src="../assets/images/qr-frame.svg" alt="Qr Frame" height={280} width={280}  className="qr-frame" /> 
        </section>
      </div>
    );
  };
  
 