import { useState, useEffect } from "react";
import { Reflection } from "../atoms/reflectionsAtom";
import {
  addDoc,
  collection,
  query,
  getDocs,
  where,
  updateDoc,
  doc,
  deleteDoc,
  setDoc,
} from "firebase/firestore";
import { firestore } from "../firebase/clientApp";
import { User } from "firebase/auth";
import { useRecoilState } from "recoil";
import { userPointsState } from "@/atoms/userPointsAtom";
import { useToast } from "@chakra-ui/react";

export const useBlockers = (date: string, user: User) => {
  const [blockers, setBlockers] = useState<Reflection[]>([]);
  const [userPoints, setUserPoints] = useRecoilState(userPointsState);
  const toast = useToast();

  const handleAddBlocker = async (blocker: string) => {
    if (blockers.length < 3) {
      const blockerToAdd: Reflection = {
        id: "", // Placeholder value, will be updated after adding the document
        text: blocker,
        date: date,
        userId: user.uid,
      };
      try {
        const docRef = await addDoc(
          collection(firestore, "blockers"),
          blockerToAdd
        );
        blockerToAdd.id = docRef.id; // Update the id value
        setBlockers([...blockers, blockerToAdd]);

        // Update points
        const newPoints = userPoints + 7;
        setUserPoints(newPoints);
        syncPointsToFirebase(user.uid, newPoints);

        toast({
          title: "Points Earned!",
          description: `You earned 7 points.`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    }
  };

  const handleEditBlocker = async (id: string, newBlocker: string) => {
    const updatedBlockers = blockers.map((blocker) =>
      blocker.id === id ? { ...blocker, text: newBlocker } : blocker
    );

    try {
      await updateDoc(doc(firestore, "blockers", id), {
        text: updatedBlockers.find((blocker) => blocker.id === id)?.text,
      });
      setBlockers(updatedBlockers);
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  const handleDeleteBlocker = async (id: string) => {
    setBlockers(blockers.filter((blocker) => blocker.id !== id));

    // Update points
    const newPoints = userPoints - 7;
    setUserPoints(newPoints);
    syncPointsToFirebase(user.uid, newPoints);

    toast({
      title: "Points Deducted",
      description: `You lost 7 points.`,
      status: "warning",
      duration: 5000,
      isClosable: true,
    });

    try {
      await deleteDoc(doc(firestore, "blockers", id));
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  const syncPointsToFirebase = async (userId: string, points: number) => {
    const userPointsDocRef = doc(firestore, "userPoints", userId);
    try {
      await setDoc(userPointsDocRef, { userId, points }, { merge: true });
    } catch (error) {
      console.error("Error syncing points to Firebase:", error);
    }
  };

  useEffect(() => {
    const loadBlockers = async () => {
      const q = query(
        collection(firestore, "blockers"),
        where("date", "==", date),
        where("userId", "==", user.uid)
      );
      const querySnapshot = await getDocs(q);
      const blockersForDay: Reflection[] = [];
      querySnapshot.forEach((doc) => {
        const blocker = doc.data() as Reflection;
        blocker.id = doc.id;
        blockersForDay.push(blocker);
      });
      setBlockers(blockersForDay);
    };
    loadBlockers();
  }, [user, date]);

  return {
    blockers,
    handleAddBlocker,
    handleEditBlocker,
    handleDeleteBlocker,
  };
};
