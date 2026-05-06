<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">

    <style>
        body {
            font-family: Arial, sans-serif;
            font-size: 12px;
            margin: 10px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        td {
            width: 25%;
            padding: 6px;
            vertical-align: top;
        }

        .token-card {
            border: 1px dashed #999;
            border-radius: 6px;
            padding: 10px 8px;
            text-align: center;
        }

        .label {
            font-size: 9px;
            color: #666;
            margin-bottom: 4px;
        }

        .code {
            font-size: 20px;
            font-weight: bold;
            letter-spacing: 3px;
            color: #111;
            margin: 8px 0;
        }

        .wifi {
            font-size: 9px;
            color: #444;
            margin-top: 4px;
        }

        .valid {
            font-size: 8px;
            color: #777;
            margin-top: 6px;
            line-height: 1.4;
        }
    </style>
</head>

<body>

<table>
    <tr>
        @foreach($tokens as $token)

            <td>
                <div class="token-card">

                    <div class="label">
                        WiFi Access Token
                    </div>

                    <div class="code">
                        {{ $token->code }}
                    </div>

                    <div class="wifi">
                        Masukan kode di halaman login WiFi
                    </div>

                    <div class="valid">
                        Berlaku hingga:<br>

                        @if($token->valid_until)
                            {{ \Carbon\Carbon::parse($token->valid_until)->timezone('Asia/Jakarta')->format('d/m/Y H:i') }} WIB
                        @else
                            -
                        @endif
                    </div>

                </div>
            </td>

            @if(($loop->iteration % 4) == 0)
                </tr><tr>
            @endif

        @endforeach
    </tr>
</table>

</body>
</html>