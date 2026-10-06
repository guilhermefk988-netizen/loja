import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { MeshoptDecoder } from "three/addons/libs/meshopt_decoder.module.js";

const container = document.querySelector('.O__3D.um');

const roupas = [
    { modelo: "./modelos3D/camisa-v4.glb" },
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

gsap.to(container, {
    x: 0,
    y: 0,

    scrollTrigger: {
        scrub: 0.5,
        //markers: true,
        top: '10% 50%',
        end: '20% 40%',
    }
})


const produtos = [
    {
        imagem: "img/camisa1__produto.png",
        alt: "camisa bege",
        nome: "Camiseta Essential",
        categoria: "Camisetas",
        detalhe: "100% Algodão",
        preco: "R$ 129,90",
        carrinho: "https://img.icons8.com/material-rounded/24/shopping-cart.png"
    },
    {
        imagem: "img/moleton__produto.png",
        alt: "moleton marrom",
        nome: "Moleton Essential Black",
        categoria: "Moletons",
        detalhe: "Categoria: Moleton",
        preco: "R$ 139,90",
        carrinho: "https://img.icons8.com/material-rounded/24/shopping-cart.png"
    },
    {
        imagem: "img/calça__produto1.png",
        alt: "calça bege",
        nome: "Calça Cargo Essential",
        categoria: "Calças",
        detalhe: "Categoria: Calças",
        preco: "R$ 189,90",
        carrinho: "https://img.icons8.com/material-rounded/24/shopping-cart.png"
    },
    {
        imagem: "img/acessorio__produto2.png",
        alt: "óculos",
        nome: "Óculos Urban Black",
        categoria: "Acessórios",
        detalhe: "Categoria: Acessórios",
        preco: "R$ 169,90",
        carrinho: "https://img.icons8.com/material-rounded/24/shopping-cart.png"
    },
    {
        imagem: "img/acessorio__produto1.png",
        alt: "boné",
        nome: "Boné Classic Black",
        categoria: "Acessórios",
        detalhe: "Categoria: Acessórios",
        preco: "R$ 89,90",
        carrinho: "https://img.icons8.com/material-rounded/24/shopping-cart.png"
    },
    {
        imagem: "img/camisa__produto2.png",
        alt: "camisa preta",
        nome: "Camiseta Signature Black",
        categoria: "Camisetas",
        detalhe: "Categoria: Camisetas",
        preco: "R$ 149,90",
        carrinho: "https://img.icons8.com/material-rounded/24/shopping-cart.png"
    },
    {
        imagem: "img/moleton__produto2.png",
        alt: "moleton branco",
        nome: "Hoodie Essential Cream",
        categoria: "Moletons",
        detalhe: "Categoria: Moletons",
        preco: "R$ 239,90",
        carrinho: "https://img.icons8.com/material-rounded/24/shopping-cart.png"
    },
    {
        imagem: "img/calça__produto2.png",
        alt: "calça preta",
        nome: "Calça Cargo Black",
        categoria: "Calças",
        detalhe: "Categoria: Calças",
        preco: "R$ 199,90",
        carrinho: "https://img.icons8.com/material-rounded/24/shopping-cart.png"
    }
];

const meuProdutos = document.querySelector('.Meus__produtos')

function mostrarProdutos(lista) {
    meuProdutos.innerHTML = lista.map((produto) => `
        <div class="produto">
            <div class="imagem__produto">
                <img src="${produto.imagem}" alt="${produto.alt}">
            </div>
            <div class="conteudo__produto">
                <h4>${produto.nome}</h4>
                <h3>${produto.detalhe}</h3>
                <p>${produto.preco}</p>

                <div class="carrinho__icone" data-nome="${produto.nome}">
                    <img src="${produto.carrinho}">
                </div>
            </div>
        </div>
    `).join('')
}

mostrarProdutos(produtos)

const header = document.querySelector('.hamburguer')
const linksHeader = document.querySelector('.list__burguer')
linksHeader.style.display = 'none'

header.addEventListener('click', function () {

    if (linksHeader.style.display === 'none') { linksHeader.style.display = 'flex' } else { linksHeader.style.display = 'none' }

})



const carrinho = document.querySelector('.carrinho')
const sairCarrinho = document.querySelector('.sair__carrinho')
const carrinhoHeader = document.getElementById('carrinhoHeader')


carrinhoHeader.addEventListener('click', function () {
    carrinho.classList.add('ativo')
    document.body.style.overflow = 'hidden';

})
sairCarrinho.addEventListener('click', function () {
    carrinho.classList.remove('ativo')
    document.body.style.overflow = '';

})


const iconeClick = document.querySelectorAll('.carrinho__icone')
const produtosDoCarrinho = document.querySelector('.meio__carrinho')

const carrinhoArray = []



meuProdutos.addEventListener('click', function (e) {
    const icone = e.target.closest('.carrinho__icone')
    if (!icone) return

    const produtinho = produtos.find((p) => p.nome === icone.dataset.nome)

    if (carrinhoArray.includes(produtinho)) return
    carrinhoArray.push(produtinho)

    produtosDoCarrinho.innerHTML += `
        <div class="produto">
        <div class="imagem__produto">
            <img src="${produtinho.imagem}">
        </div>
        <div class="conteudo__dos__produtos">
        <div class="conteudo__produto">

            <h4>${produtinho.nome}</h4>
            <h3>${produtinho.detalhe}</h3>

        </div>
        <div class="mudadores">
        <div class="controle__preço">
            <div class="mais">
                +
            </div>
            <div class="numeroAumentar">
                1
            </div>
            <div class="menos">
                -
            </div>
            </div>
        </div>
        <div class="preço">
            <p>${produtinho.preco}</p>
        </div>

        <div class="delete">
            x
        </div>
        </div>
    </div>
`

})
const CadastroComBotao = document.querySelector('.parte__botao__cadastro')
const botaoCadastro = document.querySelector('.parte__botao__cadastro button')
const Cadastro = document.querySelector('.parte__cadastro')
const botaoLogin = document.querySelector('.botao__login')
const Login = document.querySelector('.parte__login')
const loginSair = document.querySelector('.parte__login button')
const botaoDoLogin = document.querySelector('.botao__login button')
const cadastroSair = document.querySelector('.parte__cadastro button')

botaoCadastro.addEventListener('click', function () {



    Cadastro.classList.add('ativo')
    CadastroComBotao.classList.add('ativo')
    botaoLogin.classList.add('ativo')
    Login.classList.add('ativo')
})
botaoDoLogin.addEventListener('click', function () {
    Cadastro.classList.remove('ativo')
    CadastroComBotao.classList.remove('ativo')
    botaoLogin.classList.remove('ativo')
    Login.classList.remove('ativo')
})
const login = document.getElementById('user')
const tela = document.querySelector('.login')


login.addEventListener('click', function () {
    tela.classList.add('ativo')
    document.body.style.overflow = 'hidden';

})
loginSair.addEventListener('click', function () {
    tela.classList.remove('ativo')
    document.body.style.overflow = '';
})
cadastroSair.addEventListener('click', function () {
    tela.classList.remove('ativo')
    document.body.style.overflow = '';
})

const ver = document.getElementById('ver')
const Naover = document.getElementById('naoVer')
Naover.style.display = 'none'
const senha = document.getElementById('senha')



Naover.style.display = 'none'

ver.addEventListener('click', function () {
    senha.type = 'text'

    ver.style.display = 'none'
    Naover.style.display = 'block'
})

Naover.addEventListener('click', function () {
    senha.type = 'password'

    Naover.style.display = 'none'
    ver.style.display = 'block'
})
const VER = document.getElementById('VER')
const NAOver = document.getElementById('NAOver')
NAOver.style.display = 'none'
const SENHA = document.getElementById('SENHA')

NAOver.style.display = 'none'

VER.addEventListener('click', function () {
    SENHA.type = 'text'

    VER.style.display = 'none'
    NAOver.style.display = 'block'
})

NAOver.addEventListener('click', function () {
    SENHA.type = 'password'

    NAOver.style.display = 'none'
    VER.style.display = 'block'
})
let numeroProduto = 0
const numeroDoProduto = document.getElementById('produtosQuantidade')
const botoes = document.querySelectorAll('.botao')
botoes.forEach((botao) => {

    botao.addEventListener('click', function () {

        botoes.forEach((botao) => {
            botao.classList.remove('ativo')
        })

        this.classList.add('ativo')

        const categoria = this.dataset.categoria

        if (categoria === 'Todos') {

            mostrarProdutos(produtos)

        } else {

            const produtosFiltrados = produtos.filter((produto) => {
                return produto.categoria === categoria
            })

            mostrarProdutos(produtosFiltrados)

        }
        numeroDoProduto.innerHTML = (numeroProduto + 1) + 'produtos'

    })

})

const mais = document.querySelector('.mais')
const menos = document.querySelector('.menos')
let numeroQUEaumenta = 0

mais.addEventListener('click', function(){
    const numeroDeProduto = document.querySelector('.numeroAumentar')

    numeroQUEaumenta++
numeroDeProduto.innerHTML = numeroQUEaumenta
})
