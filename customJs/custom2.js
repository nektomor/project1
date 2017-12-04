var d = document;
	/////////
	////// Функции для редактирования пользователей
	//Выводит сообщение что нет данных, на странице пользователей
	function rowAmountForDefault(r){
		var table=d.getElementById(r).rows.length-1;
		if (table<=0){
			var tbody = d.getElementById(r).getElementsByTagName('TBODY')[0];
			var row = d.createElement("TR");
			tbody.appendChild(row);
			row.className = "default";
			var td1 = d.createElement("TD");
			var td1 = d.createElement("TD");
			var td2 = d.createElement("TD");
			var td3 = d.createElement("TD");
			var td4 = d.createElement("TD");
			var td5 = d.createElement("TD");
			var td6 = d.createElement("TD");
			var td7 = d.createElement("TD");
			var td8 = d.createElement("TD");
			td1.className= "a-center";
			row.appendChild(td1);
			row.appendChild(td2);
			row.appendChild(td3);
			row.appendChild(td4);
			row.appendChild(td5);
			row.appendChild(td6);
			row.appendChild(td7);
			row.appendChild(td8);
			td4.innerHTML = 'Данные отсутствуют!';
		}
	}
	/////
	//Добавление пользователей
	function addRow(r, inp){
		var input = inp.parentNode.getElementsByTagName('input');
		for (var x=0;x<=d.getElementById(r).rows.length-1; x++){
			if (d.getElementById(r).getElementsByTagName('tr')[x].classList.contains('default')){
				d.getElementById(r).getElementsByClassName('default')[0].remove();
			}
		}
		var forename = input[0].value;
		var	name =	input[1].value;
		var thirdname = input[2].value;
		var password= str_rand();
		addRowToDb(r,forename,name,thirdname,password);
	}
	//Удаление пользователей
	function deleteRow(r){
		var a=$('#'+r+'>tbody > tr'); //выбираем все отмеченные checkbox
		var out=[];
		for (var x=0; x<a.length;x++){ //перебераем все объекты 
			var tdCount=a[x].getElementsByTagName('td');
			if (a[x].getElementsByTagName('td')[0].getElementsByTagName('input')[0].checked){
					out.push(tdCount[1].getElementsByTagName('span')[0].innerHTML);
				a[x].remove();
			}
		
		}
		uri = "/adminpanel/create_users_sql/";
		params='delete[]='+out;
		sql(params,uri);
		rowAmountForDefault(r);
		changePage(r);
	}
	//Калбек функция для добавления пользователей
	function calback(tableId,request){
		var	mes=JSON.parse(request.responseText);
		if (mes.mesedit=="Ok"){
			var tbody = d.getElementById(tableId).getElementsByTagName('TBODY')[0];
			var row = d.createElement("TR");
			tbody.appendChild(row);
			row.className = "even pointer";
			var td1 = d.createElement("TD");
			var td2 = d.createElement("TD");
			var td3 = d.createElement("TD");
			var td4 = d.createElement("TD");
			var td5 = d.createElement("TD");
			var td6 = d.createElement("TD");
			var td7 = d.createElement("TD");
			var td8 = d.createElement("TD");
			var td9 = d.createElement("TD");
			td1.className= "a-center";
			td2.style.display = "none";
			row.appendChild(td1);
			row.appendChild(td2);
			row.appendChild(td3);
			row.appendChild(td4);
			row.appendChild(td5);
			row.appendChild(td6);
			row.appendChild(td7);
			row.appendChild(td8);
			row.appendChild(td9);
			
			// Наполняем ячейки
			td1.innerHTML = "<input type='checkbox' class='flat' name='table_records' />";
			td2.innerHTML = '<span class="" style="display: inline;">'+mes.id+'</span>';
			td3.innerHTML = '<span class="" style="display: inline;">'+mes.secondname+'</span>';
			td4.innerHTML = '<span class="" style="display: inline;">'+mes.name+'</span>';
			td5.innerHTML = '<span class="" style="display: inline;">'+mes.thirdname+'</span>';
			td6.innerHTML = '<span class="" style="display: inline;">'+mes.login+'</span>';
			td7.innerHTML = '<span class="" style="display: inline;">'+mes.password+'  |  '+mes.password2+'</span>';
			td8.innerHTML = '<span class="" style="display: inline;">'+mes.role+'</span>';
			td9.innerHTML =	'<span class="" style="display: inline;">'+mes.registration+'</span>';
			changePage(tableId);
		}else{
			alert("Что-то пошло не так!");
		}
	}
	function addRowToDb(tableId,forename,name,thirdname,password){
		uri = "/adminpanel/create_users_sql/";
		params='add=ok';
		params+='&secondname='+forename;
		params+='&name='+name;
		params+='&thirdname='+thirdname;
		params+='&password='+password;
		sqlAddWithCallback(tableId,params,uri,calback);	
	}
	function sqlAddWithCallback(tableId,params,uri,callback){
		var request = new ajaxRequest();

		request.onreadystatechange = function()
		{
			if (request.readyState==4)
			{
				if (request.status==200)
				{
					if (request.responseText != null)
					{
						 callback(tableId,request);
					}
					else alert ("Данные не полученны");
				}
				else alert ("Ошибка Ajax"+this.statusText);
			}
		}
		request.open("POST", uri, true);
		request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		request.send(params);
	}
	
	///////////
	//Функция для обновления постраничной нафигации таблицы при удалении и добавлении
	function changePage(r){
		var i=document.getElementById(r);
		var countTable = i.rows.length-1;
		var countPage= i.parentNode.getElementsByClassName("page-navigation")[0].getElementsByTagName("a").length-4;
		for (x=0;x<i.parentNode.getElementsByClassName("page-navigation")[0].getElementsByTagName("a").length;x++)
		{
			if (i.parentNode.getElementsByClassName("page-navigation")[0].getElementsByTagName("a")[x].hasAttribute('data-selected')){
				var page = i.parentNode.getElementsByClassName("page-navigation")[0].getElementsByTagName("a")[x].innerHTML;
			}
		}
		if (countTable>0){
			if (page>Math.ceil(countTable/10)){
				i.parentNode.getElementsByClassName("page-navigation")[0].remove();
				pagination(r,Math.ceil(countTable/10)-1);
			}else{
				i.parentNode.getElementsByClassName("page-navigation")[0].remove();
				pagination(r,page-1);
			}
		}else{
			i.parentNode.getElementsByClassName("page-navigation")[0].remove();
			pagination(r,0);
		}
	}
	// Функция для постраничной навигации для таблиц
	function pagination(r,startPage){
		$('#'+r).paginate({
			initialPage: startPage,
			optional: false,
			limit: 10,
			onSelect: function(obj, page) {
			  console.log('Page ' + page + ' selected!' );
			}
			});
	}
	//Функция для создания постраничной навигации при открытии страницы
	for (var x=1;x<=$('table').length;x++){
		$('#datatable'+x).paginate({
			optional: false,
			limit: 10,
			onSelect: function(obj, page) {
			  console.log('Page ' + page + ' selected!' );
			}
		});
	}

	function sql(params,uri){
		var request = new ajaxRequest();

		request.onreadystatechange = function()
		{
			if (request.readyState==4)
			{
				if (request.status==200)
				{
					if (request.responseText != null)
					{
					}
					else alert ("Данные не полученны");
				}
				else alert ("Ошибка Ajax"+this.statusText);
			}
		}
		request.open("POST", uri, true);
		request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		request.send(params);
	}
	function ajaxRequest()
	{
		try // IE
		{
			var request = new XMLHttpRequest()
		}
		catch(e1)
		{
			try//This IE 6+?
			{
				request = new ActiveXObject("Msxml2.XMLHTTP")
			}
			catch(e2)
			{
				try // This IE 5?
				{
					request = new ActiveXObject("Microsoft.XMLHTTP")
				}
				catch(e3)// This brouser not supported Ajax
				{
					request = false
				}
			}
		}
		return request
	}
	////////

	//Формирует рандомно пароль
	function str_rand() {
        var result       = '';
        var words        = '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
        var max_position = words.length - 1;
            for( i = 0; i < 10; ++i ) {
                position = Math.floor ( Math.random() * max_position );
                result = result + words.substring(position, position + 1);
            }
        return result;
    }