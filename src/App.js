import React, {useState, useEffect} from "react";
import "./style.css";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";


function App() {

  const [input, setInput] = useState("");  //normalde orjinal videoda bunu todoform için tanımlamıştık. Ama ben H1 in yanına input yazdırabilmek için
  //input,setInput 'u app.js'te tanımladım. Ve props ile TodoForm component'ına gönderdim.

  const [todos, setTodos] = useState([]); //önce boş bir array, yapılacaklar listesi

  const [status, setStatus] = useState("all");
  const [filteredTodos,setfilteredTodos] = useState([]); //tıkladığım şeye göre bana yeni bir dizi oluştur ve onu göster . Yani todos daki diziyi değiştireceğiz

 

  useEffect( () => {
    localStorage.setItem("liste",JSON.stringify(todos))
  } , [todos]) ;
  // kodun sonundaki "[todos]" ifadesi useEffect i todos'un State ine bağımlı yapıyor. useEffect onu devamlı kontrol ediyor. Ne zaman useState güncellendi ( ekleme,silme,düzeltme,undone olaylarında useState güncellenmiş oluyor) useEffect çalışıyor ve yapılacaklarListsinin son halini bastırıyor

  const liste = JSON.parse(localStorage.getItem("liste"))


  useEffect(() => { filteredHandler(todos)}, [todos,status]) //eslint-disable-line 
  //todos ya da 
  //status değiştiğinde filteredHandler fonksiyonu çalışsın. İçine todos parametresi almalı mı?
   //;  saveLocalTodos(); }
console.log("status" , status);
  const filteredHandler = () => {  
    switch(status) {
      case "completed":
      setfilteredTodos(todos.filter((todo) => {
        return todo.completed === true})); //yani todo.completed = true olanları döndür
      break;
      case "uncompleted":
      setfilteredTodos(todos.filter((todo) => todo.completed === false));
      break;
      default:
        setfilteredTodos(todos);
        break;  //hiçbiri değilse todos u olduğu gibi setFiltered içine at.
    }
  }

  const addTodo = (text) => {
    let id=1;
    if(todos.length > 0) {  //orjinalde todos.length > 0 dı. id>0 da yapılabilir
      id= todos[0].id +1;
      console.log("id :" + id);
    }
    let todo = {id:id , text:text ,completed:false};  //aldığın text yani input ile bir eleman obje niteliğinde oluştur. "todo" değişkeni arrayimizin 1. elemanı yani 1.objesi oluyor.
    let newTodos=[todo,...todos]; //todo ilk yaptığımı tutuyor, todos ta useState ile değişikliklerimi yani eklediklerimi
    //aslında newTodos diye yeni bireleman tanımlamaskta olurdu. Bu şu demek; setTodos([todo,...todos])
    //todo,...todos şwklinde yazmamızın sebebi todo yani son yazdığım inputu arrayin ilk elemanı olarak atıyor. Geri kalanını da ...todos ile kopyala yapıştır yapıyor.
    console.log(todo); //tek bir obje verir.
    console.log(newTodos);
    setTodos(newTodos);
  }

  //todos bir arraydir //...todos , obje şeklinde her elemanı tek tek ayrı ayrı yazdırır
    console.log(todos);
  const removeTodo = (id) => {
    let updatedTodos = todos.filter((todo) => todo.id !== id)  //filter silmek için kullanılır
    //todos içerisindeki todo'nun id'si, tıkladığımın id'sine eşit değilse, geri kalanını yazdır.
    console.log(todos);
    setTodos(updatedTodos);
  }
  const completeTodo = (id) => {
    let updatedTodos = todos.map((todo) => {
      if(todo.id === id) {  //eğer eşit ise todocompleted in tersini gönder. False ise true yap, true ise false yap
        todo.completed = !todo.completed
      }
      return todo
    })
    setTodos(updatedTodos);  //aynı remove daki gibi updated todos 'u tanımlamadan direk setTodos(.....) içerisine de yazabilirisk.
  };
  //todos.map ile array 'in elemanları üzerinde döneceğim. yani todo objeleri üzerinde gezineceğim.
  //ve todo objesinin text'ini alıp todoitem değişkenine atıyorum. Bunu props ile dışarıdan alacağım. 
  return ( //addtodof = {addtodo}  açıklaması: bu sayfadaki addtodo yu al, TodoForm'a addtodof olarak yolla.
    <div className="todo-app">
      <h1>My Todo List 
        <h2>{input}</h2>  
      </h1>
      <TodoForm addToDof={addTodo} input={input} setInput={setInput} setStatus={setStatus}/>
      
      {
      filteredTodos.map((todo) => {   //todos.map((todo) yu  filteredTodos.map((todo) ya çeviriyoruz en sonda . Çünki zaten filteredTodos filteredHandler içinde setFilteredTodos ile todos üzerinde güncelleme yapıp.useEffect ile yeniden bastırıyor.
        return(
          <TodoItem filteredTodos = {filteredTodos}  removeEtf = {removeTodo} completeTodof={completeTodo} todoitem = {todo} key={todo.id} />
        )
      }
      )}
  
      
     
               
    </div>
  );
}
  //Component'a TodoForm'a ister özellik verirsin , ister fonksiyon farketmez.addToDof'e fonksiyon atıyoruz 
  //ve bu fonksiyonu yuarıda const addTodo olarak tanımlıyoruz. 

export default App;
