create table plan(
	id_plan serial not null,
	tipo_plan varchar(80)not null,
	primary key(id_plan)
);

insert into plan (tipo_plan) values('free');
insert into plan (tipo_plan) values('premium');

create table usuario(
	id_usu serial not null,
	nombre_usu varchar(100) not null,
	nickname_usu varchar(100)not null,
	primary key(id_usu)
);

insert into usuario (nombre_usu,nickname_usu)values('raunel','raunel_95@live.com.mx');



create table userplan(
	id_userp serial not null,
	sub_userp varchar(70) not null,
	fecha_userp date not null,
	id_usu serial not null, 
	id_plan serial not null,
	primary key(id_userp),
	foreign key(id_usu) references usuario(id_usu),
	foreign key(id_plan) references plan(id_plan)
);

insert into userplan(sub_userp,fecha_userp,id_usu,id_plan) values('rau1234Rljjs',current_date,1,1);

delete from userplan where id_userp='1';
