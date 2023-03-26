
import { CodeBlock } from "react-code-blocks";

function CppCode({ text }) {

    return <CodeBlock
        text={text}
        language={"cpp"}
    />
}

const cppClass = "" +
    "class Foo {\n" +
    "    int a;\n" +
    "    int b;\n" +
    "};\n";

export function Component() {
    return <>
        <h1>C++ API Design</h1>
        <div>
            Recently I gave this talk about C++ API design at work. I thought it would be a good idea to write it up as a blog post.

            So first let's talk about what do I mean by C++ API design, I mean mainly two things:
            <ul>
                <li>What types should function params have?</li>
                <li>What types should function return?</li>
            </ul>
            And by functions I am only talkng about free functions and object methods. I exclude this discussion from talking about constructors and
            destructors.
            <div>
                <b>Note that</b> I am only talking about my personal opionion, I do not believe this is a formal guideline and it is not hard and fast rules.
                Use your C++ common sense when applying these suggestions.
            </div>
            <h2>Primitive Types</h2>
            <p>
                The rule for primitive types is simple, for int, double, float, bool, simply pass them by value should be fine. This is because
                they are usually small enough to fill in the register and instruction that even if we pass them by reference, we are being optimal efficient.
            </p>
            <h2>Class/Struct/User Defined Types </h2>
            Suppose you have a class like this:
            <CodeBlock
                text={cppClass}
                language={"cpp"}

            />
            <div>
                For user defined types, the general rule of thumb is:
                <ul>
                    <li>If you are only reading from the variable, use const ref, in this case: <CppCode text={`void processFoo(..., const Foo& foo)`} /> </li>
                    <li>If you need to modifty the variable in your function, pass it by ref is most ideal, e.g. <CppCode text={"void processFoo(..., Foo& foo)"} /> </li>
                </ul>
            </div>
        </div>
    </>
}