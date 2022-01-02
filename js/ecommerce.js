function renderizarProdutos() {
    var produtosJSON = JSON.parse(produtos);

    let divProdutos = '';
    produtosJSON.forEach(produto => {
        divProdutos += produtoComponente(produto)
    });

    document.getElementById("listaProdutos").innerHTML = divProdutos
}

const produtoComponente = (dados) => `
    <div class="produto">
        <div class="topo_produto">
            <div class="topo_desconto">
                ${dados.desconto_pix}%<br/>
                <svg width="16" viewBox="0 0 16 8" fill="none" xmlns="https://www.w3.org/2000/svg"><path d="M0 -3.65575e-06L16 0L8 8L0 -3.65575e-06Z" fill="#fff"></path></svg>
            </div>
            <div class="topo_estoque">Restam<br/><b>${dados.qtd_estoque}</b><br/>unid.</div>
            <div class="topo_favoritar"><a href="#" onclick="favoritar(${dados.id}, this)">${localStorage.getItem('produto_'+dados.id) > 0 ? iconeFavorito(true) : iconeFavorito(false)}</a></div>
        </div>
        <div class="imagem_produto">
            <img src="imagens/produtos/${dados.imagem_arquivo}" alt="Memória DDR" />
        </div>
        <div class="nome_produto">${dados.descricao}</div>
        <div class="valor_produto">R$ ${converterParaReal(dados.preco)}</div>
        <div class="valor_produto_com_desconto">R$ ${ calcValorComDesconto(dados.preco, dados.desconto_pix) }</div>
        <div class="msg_a_avista">À vista no PIX</div>
        <div>
            <button class="botao_comprar" onclick="comprar(${dados.id})">Comprar</button>
        </div>
    </div>
    `
function calcValorComDesconto(preco, desconto) {
    preco = parseFloat(preco)
    desconto = parseFloat(desconto)
    if (desconto < 100)
        return converterParaReal(preco * (100-desconto) / 100);
    else
        return converterParaReal(preco)
}

function converterParaReal(valor) {
    valor = valor.toFixed(2)

    return valor.toLocaleString('pt-br').replace('.', ',');
}

function iconeFavorito(preenchido) {
    if (preenchido)
        return '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 4.435c-1.989-5.399-12-4.597-12 3.568 0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-8.118-10-8.999-12-3.568z"/></svg>'
    else
        return '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 9.229c.234-1.12 1.547-6.229 5.382-6.229 2.22 0 4.618 1.551 4.618 5.003 0 3.907-3.627 8.47-10 12.629-6.373-4.159-10-8.722-10-12.629 0-3.484 2.369-5.005 4.577-5.005 3.923 0 5.145 5.126 5.423 6.231zm-12-1.226c0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-7.962-9.648-9.028-12-3.737-2.338-5.262-12-4.27-12 3.737z"/></svg>'
}

function favoritar(produto_id, componente) {
    let existe = localStorage.getItem("produto_"+produto_id)
    if (existe > 0) {
        localStorage.removeItem("produto_"+produto_id);
        componente.innerHTML = iconeFavorito(false)
    } else {
        localStorage.setItem("produto_"+produto_id, produto_id);
        componente.innerHTML = iconeFavorito(true)
    }
}

renderizarProdutos()