import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { MeshoptDecoder } from "three/addons/libs/meshopt_decoder.module.js";

const container = document.querySelector('.O__3D.um');

const roupas = [
    { modelo: "./modelos3D/camisa.glb" },
    { modelo: "./modelos3D/sapato-v1.glb" },
    { modelo: "./modelos3D/calça.glb" },
];

const cena = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
const renderizar = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderizar.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderizar.domElement);

cena.add(new THREE.AmbientLight(0xffffff, 2));
const luzDirecional = new THREE.DirectionalLight(0xffffff, 1.5);
luzDirecional.position.set(2, 3, 4);
cena.add(luzDirecional);

camera.position.z = 2;

window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderizar.setSize(container.clientWidth, container.clientHeight);
});

const loader = new GLTFLoader();
loader.setMeshoptDecoder(MeshoptDecoder);

const modelosCarregados = new Array(roupas.length).fill(null);
let numero = 0;
let totalCarregado = 0;

// pré-carrega TODOS os modelos uma vez, escondidos
roupas.forEach((roupa, indice) => {
    loader.load(
        roupa.modelo,
        (gltf) => {
            const modelo = gltf.scene;
            modelo.visible = (indice === numero); // só o primeiro fica visível
            cena.add(modelo);
            modelosCarregados[indice] = modelo;

            totalCarregado++;
            if (totalCarregado === roupas.length) {
                console.log("Todos os modelos carregados");
                // aqui você pode esconder um spinner/loading inicial, se tiver
            }
        },
        (xhr) => {
            if (xhr.total) {
                console.log(`${roupa.modelo}: ${(xhr.loaded / xhr.total) * 100}% carregado`);
            }
        },
        (erro) => console.error(`Erro ao carregar ${roupa.modelo}:`, erro)
    );
});

function animação() {
    requestAnimationFrame(animação);
    const ativo = modelosCarregados[numero];
    if (ativo) ativo.rotation.y += 0.01;
    renderizar.render(cena, camera);
}
animação();

function trocarSlide(novoNumero) {
    const atual = modelosCarregados[numero];
    const proximo = modelosCarregados[novoNumero];

    if (atual) atual.visible = false;
    numero = novoNumero;
    if (proximo) proximo.visible = true; // se ainda não carregou, só fica visível quando terminar
}

const passar = document.querySelector('.passar');
const volta = document.querySelector('.voltar');
const meuSlides = document.querySelectorAll('.Meu__3D')
const barras = document.querySelectorAll('.barra')


passar.addEventListener('click', () => {
    trocarSlide((numero + 1) % roupas.length);
const slidAtivo = document.querySelector('.Meu__3D.ativo')
slidAtivo.classList.remove('ativo')
const barraAtiva = document.querySelector('.barra.ativo')
barraAtiva.classList.remove('ativo')

barras[numero].classList.add('ativo')
meuSlides[numero].classList.add('ativo')
document.querySelector('.numeros').innerHTML = '0' + (numero + 1)

});

volta.addEventListener('click', () => {
    trocarSlide((numero - 1 + roupas.length) % roupas.length);
    const slidAtivo = document.querySelector('.Meu__3D.ativo')
slidAtivo.classList.remove('ativo')
const barraAtiva = document.querySelector('.barra.ativo')
barraAtiva.classList.remove('ativo')

barras[numero].classList.add('ativo')
document.querySelector('.numeros').innerHTML = '0' + (numero + 1)
meuSlides[numero].classList.add('ativo')
});


gsap.registerPlugin(ScrollTrigger)
 document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(ScrollTrigger)
 });

 gsap.to(container,{
    x: 0,
  y: 0,

  scrollTrigger:{
    scrub: 0.5,
    //markers: true,
    top: '10% 50%',
    end: '20% 40%',
  }
 })
