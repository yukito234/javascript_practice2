'use strict';

{
	const newTask = document.getElementById("newTask");
	const addBtn = document.getElementById("addBtn");
	const toDoListTable = document.getElementById("toDoListTable");
	const toDoListTbody = document.getElementById("toDoListTbody");

	const taskAll = document.getElementById("taskAll");
	const taskWorking = document.getElementById("taskWorking");
	const taskFinished = document.getElementById("taskFinished");

	let toDoList = [];	
	let taskCounter = 0;	
	let deleteCounter = 0;	
	let workingBtnCounter = 0;	
	let arrayIndex = 0;
	
	function taskDisplay(){

		let tableRow = document.createElement("tr");
		let tableDataID = document.createElement("td");
		let tableDataTask = document.createElement("td");
		let tableDataCondition = document.createElement("td");		

		tableRow.id = `tr${taskCounter}`;		
		tableDataID.innerHTML = `<td>${arrayIndex}</td>`;		
		tableDataTask.innerHTML = `<td>${toDoList[arrayIndex].taskName}</td>`;
		tableDataCondition.innerHTML = `<td><input type="button" class="isWorkingBtnClass" id="isWorkingBtn_${taskCounter}" value="作業中"></td><td><input type="button" class="deleteBtnClass" id="deleteBtn_${taskCounter}" value="削除"></td>`;

		tableRow.appendChild(tableDataID);
		tableRow.appendChild(tableDataTask);
		tableRow.appendChild(tableDataCondition);
		toDoListTbody.appendChild( tableRow );
		
		arrayIndex++;
		taskCounter++;

	}

	function checkWorkingCondition(){

		workingBtnCounter = arrayIndex - 1;
		const isWorkingBtnClass = document.getElementsByClassName("isWorkingBtnClass");

		isWorkingBtnClass[workingBtnCounter].addEventListener("click", function changeWorkingCondition(){

			let changeNum = Number( this.parentElement.parentElement.firstElementChild.textContent );

			if( toDoList[changeNum].isWorking ){

				this.value = "完了";
				toDoList[changeNum].isWorking = false;		

			} else{

				this.value = "作業中";
				toDoList[changeNum].isWorking = true;			

			}		
		});
	}
	
	function deleteEventRegister(){		

		deleteCounter= arrayIndex - 1;
		const deleteBtnClass = document.getElementsByClassName("deleteBtnClass");		

		deleteBtnClass[deleteCounter].addEventListener("click", function deleteBtn(){

			let deleteNum = Number( this.parentElement.parentElement.firstElementChild.textContent );
			
			for(let loopCounter = deleteNum + 1; loopCounter < toDoList.length; loopCounter++){

				toDoList[loopCounter].index = toDoList[loopCounter].index - 1;

			}		

			toDoList.splice(deleteNum,1);
			arrayIndex--;

			let deleteTableRow = this.parentElement.parentElement;
			let next = deleteTableRow.nextElementSibling;

			for(let loopCounter = deleteNum + 1; loopCounter <= toDoList.length; loopCounter++){

				next.firstElementChild.textContent = loopCounter - 1;
				next = next.nextElementSibling;

			}

			toDoListTable.deleteRow(deleteNum + 1);	
			
		});
	}

	addBtn.addEventListener("click", function toDoCreate(){		

		let element = {taskName: newTask.value, isWorking: true, elementId:taskCounter, index:arrayIndex};
		toDoList.push(element);
		
		taskDisplay();
		deleteEventRegister();
		checkWorkingCondition();
		
	});
	
	taskWorking.addEventListener("click", function toDoCreate(){

		for(let loopCounter = 0; loopCounter < toDoList.length; loopCounter++){

			if( !toDoList[loopCounter].isWorking ) {				

				toDoListTbody.children[loopCounter].style.display = "none";

			} else{

				toDoListTbody.children[loopCounter].style.display = "";

			}
		}

	});

	taskFinished.addEventListener("click", function toDoCreate(){

		for(let loopCounter = 0; loopCounter < toDoList.length; loopCounter++){

			if( toDoList[loopCounter].isWorking ) {				

				toDoListTbody.children[loopCounter].style.display = "none";

			} else{

				toDoListTbody.children[loopCounter].style.display = "";
			}
		}
	});

	taskAll.addEventListener("click", function toDoCreate(){

		for(let loopCounter = 0; loopCounter < toDoList.length; loopCounter++){

			if( toDoListTbody.children[loopCounter].style.display === "none" ) {
				
				toDoListTbody.children[loopCounter].style.display = "";

			} 
		}		
	});
}