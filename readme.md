
# 法令APIラッパー

## TL;DR
法令APIの簡易ラッパー。TypeScriptによる完璧な型補完で、快適な法令検索を可能にします。

製作中

## Example 1. コード例
```ts
import { Client, isError, resolveRepealStatus } from "src"

const client = new Client();

async function main() {
    const res = await client.getLaw({ law_num_era: "Meiji" });
    if( isError( res ) ){
        console.error( res );
        return;
    } 

    res.laws.map( law => {
        console.log(`《${resolveRepealStatus(law.revisionInfo.repealStatus)}》【${law.lawInfo.lawNum}】${law.revisionInfo.lawTitle}`)
    })

    for( const law of res.laws ){
        // 法律の本文を取得する
        const detailRaw = await law.getFullLawData();
        if( isError( detailRaw ) ){
            console.error("失敗しました。");
            return;
        }

        fs.writeFileSync(
            `./${detailRaw.revisionInfo.lawTitle}.md`,
            detailRaw.lawFullText.toMarkdown()
        )
    }
}

( async () => await main())()
```

## Example 2. 法律をマークダウンにして出力する
完全に対応しているわけではありませんが、法律本文をマークダウンにして出力することが出来ます。

```js
// ...ここまでで取得した法律クラスを含む変数lawを用いる
const lawFullText = law.lawFullText.toMarkdown();
console.log( lawFullText ) // マークダウンになって出力
```

実際に出力したサンプルは /examples からご覧ください。


