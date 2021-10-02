use neon::prelude::*;

fn convert(mut cx: FunctionContext) -> JsResult<JsValue> {
    let input = cx.argument::<JsString>(0)?.value(&mut cx);    
    let output = cx.argument::<JsString>(1)?.value(&mut cx);    

    match imgopt_lib::convert(&input, &output) {
        Ok(_) => Ok(cx.boolean(true).as_value(&mut cx)),
        Err(e) => Err(cx.throw_error(e.to_string())?),
    }
}

#[neon::main]
fn main(mut cx: ModuleContext) -> NeonResult<()> {
    cx.export_function("convert", convert)?;
    Ok(())
}
