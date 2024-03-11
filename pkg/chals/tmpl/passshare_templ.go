// Code generated by templ - DO NOT EDIT.

// templ: version: v0.2.543
package tmpl

//lint:file-ignore SA4006 This context is only used if a nested component is present.

import "github.com/a-h/templ"
import "context"
import "io"
import "bytes"

import (
	"github.com/xctf-io/xctf/pkg/gen/chalgen"
)

type PassShareState struct {
	BaseURL  string
	Password string
}

func lock(baseUrl string) templ.ComponentScript {
	return templ.ComponentScript{
		Name: `__templ_lock_a78e`,
		Function: `function __templ_lock_a78e(baseUrl){const lock = new PatternLock({
        $canvas: document.querySelector('#lock'),
        width: 300,
        height: 430,
        grid: [ 6, 8 ],
    });
    lock.onComplete(({ hash }) => {
        fetch(baseUrl + '/solve', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ hash }),
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                alert(` + "`" + `${data.flag} Password: ${data.password}` + "`" + `);
            } else {
                alert('Failed');
            }
        });

    });
}`,
		Call:       templ.SafeScript(`__templ_lock_a78e`, baseUrl),
		CallInline: templ.SafeScriptInline(`__templ_lock_a78e`, baseUrl),
	}
}

func PassShare(s PassShareState, ps *chalgen.PassShare) templ.Component {
	return templ.ComponentFunc(func(ctx context.Context, templ_7745c5c3_W io.Writer) (templ_7745c5c3_Err error) {
		templ_7745c5c3_Buffer, templ_7745c5c3_IsBuffer := templ_7745c5c3_W.(*bytes.Buffer)
		if !templ_7745c5c3_IsBuffer {
			templ_7745c5c3_Buffer = templ.GetBuffer()
			defer templ.ReleaseBuffer(templ_7745c5c3_Buffer)
		}
		ctx = templ.InitializeContext(ctx)
		templ_7745c5c3_Var1 := templ.GetChildren(ctx)
		if templ_7745c5c3_Var1 == nil {
			templ_7745c5c3_Var1 = templ.NopComponent
		}
		ctx = templ.ClearChildren(ctx)
		_, templ_7745c5c3_Err = templ_7745c5c3_Buffer.WriteString("<div><script src=\"/build/vanilla.example.js\"></script><h1>PassShare</h1><p>Share your password with a friend!</p><canvas id=\"lock\"></canvas><h3>Forgot your pattern? No problem!</h3><p>Use the offline pattern recovery device we mailed you.</p>")
		if templ_7745c5c3_Err != nil {
			return templ_7745c5c3_Err
		}
		templ_7745c5c3_Err = lock(s.BaseURL).Render(ctx, templ_7745c5c3_Buffer)
		if templ_7745c5c3_Err != nil {
			return templ_7745c5c3_Err
		}
		_, templ_7745c5c3_Err = templ_7745c5c3_Buffer.WriteString("</div>")
		if templ_7745c5c3_Err != nil {
			return templ_7745c5c3_Err
		}
		if !templ_7745c5c3_IsBuffer {
			_, templ_7745c5c3_Err = templ_7745c5c3_Buffer.WriteTo(templ_7745c5c3_W)
		}
		return templ_7745c5c3_Err
	})
}
