
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  Pressable,
  StyleSheet,
} from "react-native";

// Student data
const students = [
  { id: "s1", name: "Ana Cruz", year: "3rd Year", photoUrl: "https://i.pravatar.cc/100?img=1" },
  { id: "s2", name: "Bea Santos", year: "2nd Year", photoUrl: "https://i.pravatar.cc/100?img=2" },
  { id: "s3", name: "Cid Ramos", year: "4th Year", photoUrl: "https://i.pravatar.cc/100?img=3" },
  { id: "s4", name: "Dex Alonzo", year: "1st Year", photoUrl: "https://i.pravatar.cc/100?img=4" },
  { id: "s5", name: "Eli Tan", year: "3rd Year", photoUrl: "https://i.pravatar.cc/100?img=5" },
];

type Student = {
  id: string;
  name: string;
  year: string;
  photoUrl: string;
  flagged: boolean;
};

type StudentCardProps = {
  id: string;
  name: string;
  year: string;
  photoUrl: string;
  flagged: boolean;
  onToggleFlag: (id: string) => void;
};

function StudentCard({
  id,
  name,
  year,
  photoUrl,
  flagged,
  onToggleFlag,
}: StudentCardProps) {
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: photoUrl }}
        style={styles.studentImage}
      />

      <View style={styles.studentInfo}>
        <Text style={styles.studentName}>{name}</Text>
        <Text style={styles.studentYear}>{year}</Text>
      </View>

      <Pressable
        onPress={() => onToggleFlag(id)}
        style={({ pressed }) => [
          styles.flagButton,
          flagged && styles.flaggedButton,
          pressed && styles.pressedButton,
        ]}
      >
        <Text style={styles.flagText}>
          {flagged ? "Flagged" : "Flag for Advising"}
        </Text>
      </Pressable>
    </View>
  );
}

// Main Student Directory component
export default function StudentDirectory() {
  const [query, setQuery] = useState("");

  const [studentList, setStudentList] = useState<Student[]>(
    students.map((student) => ({
      ...student,
      flagged: false,
    }))
  );

  // Search students
  const filteredStudents = studentList.filter((student) =>
    student.name.toLowerCase().includes(query.toLowerCase())
  );

  // Toggle student flag
  const toggleFlag = (id: string) => {
    setStudentList((previousStudents) =>
      previousStudents.map((student) =>
        student.id === id
          ? { ...student, flagged: !student.flagged }
          : student
      )
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Student Directory</Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Search student name..."
        value={query}
        onChangeText={setQuery}
      />

      <ScrollView>
        {filteredStudents.map((student) => (
          <StudentCard
            key={student.id}
            id={student.id}
            name={student.name}
            year={student.year}
            photoUrl={student.photoUrl}
            flagged={student.flagged}
            onToggleFlag={toggleFlag}
          />
        ))}

        {filteredStudents.length === 0 && (
          <Text style={styles.noResults}>
            No students found.
          </Text>
        )}
      </ScrollView>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F4F7",
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#222",
  },
  searchInput: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 15,
  },
  card: {
    backgroundColor: "white",
    padding: 12,
    marginBottom: 12,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  studentImage: {
    width: 55,
    height: 55,
    borderRadius: 30,
  },
  studentInfo: {
    flex: 1,
  },
  studentName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  studentYear: {
    fontSize: 13,
    color: "gray",
    marginTop: 4,
  },
  flagButton: {
    backgroundColor: "#2878D0",
    padding: 9,
    borderRadius: 6,
  },
  flaggedButton: {
    backgroundColor: "#218838",
  },
  pressedButton: {
    opacity: 0.6,
  },
  flagText: {
    color: "white",
    fontSize: 11,
    fontWeight: "bold",
  },
  noResults: {
    textAlign: "center",
    marginTop: 25,
    color: "gray",
  },
});
