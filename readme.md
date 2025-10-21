
# 法令APIラッパー

## TL;DR
法令APIの簡易ラッパー。TypeScriptによる完璧な型補完で、快適な法令検索を可能にします。

製作中

## Example
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
}

( async () => await main())()
```
