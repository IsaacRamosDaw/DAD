import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Input,
  Table,
  VStack,
} from "@chakra-ui/react"
import { useEffect, useState, useMemo } from "react"
import { loadPeople, savePeople, saveQuery } from "./storage/storage";
import { getUsers } from "./api/api";

function App() {
  const initialPeople = () => {
    const local = loadPeople()
    return Array.isArray(local) ? local : []
  }

  const [query, setQuery] = useState("");
  const [people, setPeople] = useState(initialPeople)

  useEffect(() => {
    (async function loadInitial() {
      try {
        const local = loadPeople();
        // console.log("datos cargados del local", local);

        if (Array.isArray(local) && local.length > 0) {
          setPeople(local);
        } else {
          const data = await getUsers();
          console.log("data")
          console.log(data)
          // FIX PRINCIPAL: Aseguramos que 'data' es un array antes de mapear.
          if (!Array.isArray(data)) {
            console.error("Error: getUsers() no retornó un array.", data);
            // Si no es un array, inicializamos con un array vacío para evitar el error .map
            setPeople([]);
            return;
          }

          const aux = data.map((u) => ({
            id: u.id,
            // CORREGIDO: Typos en "undefined"
            name: u.name ?? "undefined",
            email: u.email ?? "undefined",
            phone: u.phone ?? "undefined",
          }));

          setPeople(aux);
          savePeople(aux);
        }
      } catch (error) {
        console.error("Error cargando datos:", error);
      }
    })();
  }, []); // Se ejecuta solo al montar el componente

  useEffect(() => {
    savePeople(people);
    console.log("Personas guardadas en el storage")
  }, [people])

  useEffect(() => {
    saveQuery(query)
  }, [query])


  const filtradas = useMemo(() => {
    const q = query.trim().toLowerCase()

    if (!q) return people;

    return people.filter((p) =>
      p.name.toLowerCase().includes(q) || p.email.toLowerCase().includes(q) || p.phone.toLowerCase().includes(q)
    )
  }, [people, query])



  function handleAdd() {
    const newPerson = {
      id: Date.now(),
      name: "Jose",
      email: "holita@email",
      phone: "4783590"
    }

    setPeople((prev) => [newPerson, ...prev])
    console.log("Persona agregada", people)
  }


  return (
    <Container p={4}>
      <Heading mb={4}> Mi app en local storage </Heading>
      <VStack align="stretch" spacing={4}>
        <HStack>
          <Input
            placeholder="Buscar nombre, email, teléfono"
            value={query}
            onChange={(e) => { setQuery(e.target.value) }}
          >
          </Input>
          <Button
            colorScheme="blue"
            onClick={handleAdd}
          > Crear
          </Button>
        </HStack>

      </VStack>
      <Box borderWidth={"1px"} borderRadius={"1px"} overflow={"auto"}>
        <Table.Root size={"sm"} variant={"outline"} >
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>ID</Table.ColumnHeader>
              <Table.ColumnHeader>Nombre</Table.ColumnHeader>
              <Table.ColumnHeader>Email</Table.ColumnHeader>
              <Table.ColumnHeader>Telefono</Table.ColumnHeader>
              <Table.ColumnHeader>Acciones</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {filtradas.map((p) => (
              <Table.Row key={p.id}>
                <Table.Cell>{p.id}</Table.Cell>
                <Table.Cell>{p.name}</Table.Cell>
                <Table.Cell>{p.email}</Table.Cell>
                <Table.Cell>{p.phone}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Box>
    </Container>
  )
}

export default App
