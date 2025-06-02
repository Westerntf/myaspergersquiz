import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { auth, db } from "../lib/firebase";
import { doc, setDoc } from "firebase/firestore";

export default function PaymentSuccess() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyAndStore = async () => {
      const sessionId = new URLSearchParams(window.location.search).get("session_id");
      const user = auth.currentUser;

      if (!sessionId || !user) {
        router.push("/login");
        return;
      }

   try {
  const res = await fetch(`/api/verify-payment?uid=${user.uid}&sessionId=${sessionId}`);
  const data = await res.json();

        if (!data.paid) {
          router.push("/not-paid");
          return;
        }

        // ✅ Save to Firestore
        await setDoc(doc(db, "purchases", user.uid), {
          quiz_id: data.quiz_id,
          session_uid: data.session_uid,
          paid: true,
          timestamp: Date.now(),
        });

        localStorage.setItem("mq_paid", "true");
        router.push("/full-report");
      } catch (err) {
        console.error(err);
        router.push("/not-paid");
      }
    };

    verifyAndStore();
  }, [router]);

  return (
    <div style={{ textAlign: "center", marginTop: "5rem" }}>
      Verifying payment...
    </div>
  );
}